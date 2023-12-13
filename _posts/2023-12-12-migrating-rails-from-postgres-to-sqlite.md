---
title: Migrating Rails from Postgres to SQLite
description: My experience migrating a Rails project from Postgres/Redis to SQLite and vastly simplifying production infrastructure.
date: 2023-12-12 22:51:00 -0800
---

I recently migrated a personal Rails project off of Postgres and Redis (for Sidekiq and caching) to SQLite (powered by [Litestack](https://github.com/oldmoe/litestack)). I've been running this app on [Fly.io](https://fly.io/) powered by a handful of Docker containers for several months, and it's been accumulating costs in the magnitude of medium American french fries every month. This has been, and remains to this day, a purely for-fun project, so I wanted to reduce costs as much as humanly possible. At the time of writing, Fly.io waives bills that are under the $5 USD mark, so I started brainstorming some ways of making this happen.

My initial thoughts were to perhaps rewrite the app with something like [Nuxt](https://nuxt.com/) or [Next.js](https://nextjs.org/), deploy it to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/), and use some NoSQL database. My thought was that if the app stays under 100k serverless function calls a month, I could probably safely stay in a free tier. I started toying with this idea, but quickly ditched it since finding a database provider in free tier land proved to be a fruitless endeavor. I also didn't like the idea of having to separate application hosting from where data was being persisted and Ruby is much more of a joy to work in than JavaScript/TypeScript.

SQLite has had a resurgence in popularity as of late, and to my delight, I discovered [Litestack](https://github.com/oldmoe/litestack) which is an open-source Ruby gem that packages up all data-related infrastructure in SQLite. For Rails, it integrates with Active Record, Active Support, Active Job, and Active Cable which would remove my need for separate Postgres and Redis containers in my Fly.io infrastructure. After seeing how easy it looked to integrate into an existing project, I decided to give it a whirl.

## Installation and revisiting the schema

[Installing Litestack](https://github.com/oldmoe/litestack#installation) was pretty straightforward for a Rails project:

```bash
bundle add sqlite3
bundle add litestack
bin/rails generate litestack:install
```

Once the generator did its work, I then checked to see if I was able to load my existing schema into SQLite. Sadly, I wasn't able to.

Up till this point, I was using Postgres UUIDs as the primary key for all of my tables, so I needed to tweak the schema to use default integer primary keys. I also discovered that Active Record array columns aren't quite supported out-of-the-box, so something like:

```ruby
t.string :my_array_column, default: [], array: true
```

...won't work with SQLite.

Since my previous migrations were all no longer compatible with SQLite and there were a handful of column types I needed to rethink, I decided to scrap all `db/migrate/*.rb` files and start with a brand new migration. I referenced `db/schema.rb` to scaffold out the bulk of what I needed, and starting reading up on supported column types in SQLite.

As a replacement for array columns, turns out JSON types with a SQLite type constraint can be used:

```ruby
t.json :my_array_column, default: []
t.check_constraint "json_type(my_array_column) = 'array'", name: "my_array_column_is_array"
```

So I went ahead and replaced all array types with this. I also had a handful of `t.jsonb` columns for Postgres, but replaced them with `t.json` for SQLite. It didn't take long before I was able to create a schema that was compatible with the new database and my existing models.

## Refactoring caching usage

Prior to Litestack, I was making heavy use of [Kredis](https://github.com/rails/kredis) for caching. Migrating away from Kredis APIs to supporting `litecache` was just a matter of switching to vanilla Rails APIs:

```ruby
# Before
Kredis.flag("my_flag").mark(expires_in: 12.hours, force: false)
Kredis.flag("my_flag").marked?

# After
Rails.cache.write("my_flag", true, expires_in: 12.hours)
Rails.cache.read("my_flag").present?
```

To ensure that my test and development environments were being tested with Litestack, I also needed to declare `litecache` as the cache store in `config/application.rb`:

```ruby
config.cache_store = :litecache
```

Once I got to this point, my test suite was green again, and I was a pretty happy camper.

## Migrating production data

The last bit of the puzzle was migrating production data. Getting production Postgres data into a production SQLite database was a bit tricky since this process involved changing primary key types and column types. I'm also making use of Active Record encryption in some models. That meant I couldn't just export a SQL dump and import it into the schema.

So naturally, I exported each Postgres table into a CSV using the `\copy` command:

```bash
psql -c "\copy table_name to '/path/to/export.csv' delimiter ',' csv header;" postgres://user:password@host:port/db_name
```

This preps the data in a format where I can easily consume it with a Rake task and import it into the new database, but I still needed to handle encrypted columns. I had some trouble figuring this out. I would have thought that importing the serialized object would let Active Record decrypt at runtime, especially considering the `active_record_encryption` values in my `config/credentials.yml.enc` weren't touched.

Regrettably, I didn't end up deep-diving into the nitty-gritty of Active Record encryption to uncover the root cause. I instead ended up exporting the decrypted column values into these CSVs to use in my Rake task, which worked, and I was happy with that for the time being. (I _would_ like to poke around Active Record to learn how encryption is implemented at some point.)

Part of the magic of SQLite is that the database is literally just a file. I ended up using a Rake task on my local machine to import the production data and then SCP'd the database to my production container's persisted volume.

## SQLite is rock solid

After having migrated the app, I'm feeling pretty excited. Not only is the app still stable, but my production infrastructure is drastically simpler. I no longer have four containers for the app, Sidekiq, Postgres, and Redis. Instead, I just have one container with a persisted volume. It runs Rails and Litestack with a database, queue, and cache in three separate SQLite files on the volume. I'm able to run everything on a less powerful CPU, reduce RAM, and still have my app as snappy as before.

With projects like [LiteFS](https://fly.io/docs/litefs/) and [Litestream](https://litestream.io/) being actively worked on, the future of supporting Rails apps with SQLite replicas is looking promising. SQLite doesn't just work for smaller projects—it can scale.

For my current needs, SQLite perfectly fit the bill. It supports my for-fun project in a much cheaper way, simplifies the infrastructure, and if I have to, scaling it up bit by bit doesn't seem daunting at all.