---
title: Replace a relational database with DynamoDB in Rails
description: Steps I took to completely remove Active Record and replace it with DynamoDB.
date: 2021-10-24 12:00:00 -0000
---

I recently was working on an already existing Rails project where using [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) made more sense than a relational database. While I won't get into the nitty-gritty of DynamoDB, what's relevant for this blog post is that it's a NoSQL database without an out-of-the-box Active Record adapter.

This meant a couple things:

1. We needed a Ruby ORM that supported DynamoDB.
2. Active Record must be removed from the project to avoid having to maintain a relational database in the project's cloud infrastructure.

This was a bit more involved than I first thought, so here are the steps I went through to successfully replace a Rails project's relational database with DynamoDB.

## 1. Install Dynamoid

[Julie Kent's article on using DynamoDB in Rails](https://www.honeybadger.io/blog/aws-dynamo-db-rails/) has a great overview of an ORM called [Dynamoid](https://github.com/Dynamoid/dynamoid) which feels really close to Active Record. This is an excellent choice for interfacing with DynamoDB, and adding it to a bundle is as easy as:

```ruby
# Gemfile

# ...
gem 'aws-sdk'
# ...
```

Now, configuring Dynamoid can be done in a few ways. The way I opted for was to maintain as much of the "Rails way" as possible, which involves having local database tables as well as a test suite. Running DynamoDB locally can be done by [running an executable `.jar` file or via Docker](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html). Since I wanted to avoid the overhead of sorting out all Java runtime dependencies, I picked Docker.

## 2. Dockerize the project

I ended up Dockerizing this project by adding a `Dockerfile` and `docker-compose.yml`—the first to define an image and the second to orchestrate multiple containers.

```dockerfile
# Dockerfile.
#
# Swap Ruby version to applicable one for your project.
FROM ruby:2.7.4

# Install Yarn.
RUN apt-get update && apt-get install -y npm && npm install -g yarn

# Setup working directory.
RUN mkdir -p /var/my-project-name
WORKDIR /var/my-project-name

# Setup dependencies. Split into separate step to utilize Docker cache.
COPY Gemfile* /var/my-project-name/
RUN bundle install
COPY yarn.lock /var/my-project-name/
RUN bin/yarn install

# Copy project files.
COPY . /var/my-project-name

# Command to boot server.
#
# 1. Prevent "Rails server already running" errors on runs.
# 2. Ensure proper DynamoDB tables exist.
# 3. Start Rails server on 0.0.0.0.
CMD rm -rf tmp/pids/server.pid && bin/rake dynamoid:create_tables && bin/rails server -b '0.0.0.0'
```

```yaml
# docker-compose.yml
#
# Ref: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

version: '3.8'

services:
  dynamodb-local:
    image: 'amazon/dynamodb-local:latest'
    working_dir: '/home/dynamodblocal'
    volumes:
      - './docker/dynamodb:/home/dynamodblocal/data'
    ports:
      - '8000:8000'
    command: '-jar DynamoDBLocal.jar -sharedDb -dbPath ./data'

  rails-app:
    build: .
    container_name: rails-app
    depends_on:
      - 'dynamodb-local'
    links:
      - 'dynamodb-local'
    volumes:
      - '.:/var/my-project-name'   # Mirror working directory in Dockerfile
    ports:
      - '3000:3000'

    # These environment variables can be left as-is. The DynamoDB container
    # doesn't need valid keys to work, it just needs them to exist.
    environment:
      AWS_ACCESS_KEY_ID: 'DUMMYIDEXAMPLE'
      AWS_SECRET_ACCESS_KEY: 'DUMMYEXAMPLEKEY'
      REGION: 'us-west-2'
```

## 3. Configure Dynamoid

First thing is to make sure our environments are referencing the proper DynamoDB tables. We'll modify our environment config.

```ruby
# config/environments/development.rb

# ...
Dynamoid.configure do |config|
  # Point to local DynamoDB server.
  config.endpoint = 'http://dynamodb-local:8000'

  # Use passed REGION from docker-compose.yml.
  config.region = ENV['REGION']
end
# ...
```

```ruby
# config/environments/production.rb

# ...
Dynamoid.configure do |config|
  # If you have a more advanced AWS infrastructure setup that uses assumed
  # roles, etc., then setting the access key and secret key aren't
  # necessary here.
  config.access_key = ENV['AWS_ACCESS_KEY_ID']
  config.secret_key = ENV['AWS_SECRET_ACCESS_KEY']
  config.region = ENV['REGION']
end
# ...
```

```ruby
# config/environments/test.rb

# ...
Dynamoid.configure do |config|
  # Essentially the same as the development environment except with an
  # explicit namespace so we don't have development and test DynamoDB table
  # names clashing with each other.
  config.namespace = "#{Rails.application.railtie_name}_#{Rails.env}"
  config.endpoint = 'http://dynamodb-local:8000'
  config.region = ENV['REGION']
end
# ...
```

## 4. Migrate models

Luckily, Dynamoid provides a very easy way to migrate our existing Active Record models to it. We just need to break inheritance chains so we stop using `ApplicationRecord` and/or `ActiveRecord::Base` and then `include Dynamoid::Document` in our model classes.

An example model might look like:

```ruby
# app/models/user.rb

class User
  include Dynamoid::Document

  field :name,  :string
  field :email, :string
  field :phone, :string
  field :age,   :integer
end
```

Since DynamoDB is a NoSQL database, migrations won't be applicable in our Rails project anymore, and model schemas are defined directly in model definitions.

## 5. Remove Active Record

Depending on your situation, this step may not be necessary, but in my case it was. The first thing to do is to modify your `config/application.rb`.

```ruby
# config/application.rb

# ...

# Replace your `require "rails/all"` line with this.
#
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
# require "active_record/railtie"
# require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# ...
```

Active Record, Active Storage, Action Mailbox, and Action Text are all commented out from the `require` statements because they all use Active Record. As a follow-up, we need to remove references to all of these libraries.

First, comment out any line that references any of the removed libraries in your environment config files (`config/environments/*`). For instance:

```ruby
# config.active_storage.service = :local
# config.active_record_migration_error = :page_load
# config.active_record.verbose_query_logs = true
```

Next, we won't need Active Storage in our front end bundle anymore, so let's remove that:

```bash
yarn remove @rails/activestorage
```

And we'll also remove references to that front end package. In `app/javascript/packs/application.js`, comment out any lines that reference `ActiveStorage`.

```jsx
// import * as ActiveStorage from "@rails/activestorage"
// ActiveStorage.start()
```

And finally, remove the following files:

- `app/models/application_record.rb`: Since we've already migrated our models to Dynamoid.
- `config/database.yml`: Since we're not using Active Record adapters.
- `db/*`: The whole directory. We won't need the schema, migrations, or seeds anymore since those were all Active Record.
- `test/fixtures/*`: This one's only really applicable if you use Minitest and fixtures, but those operate using Active Record, so we don't need those anymore.

## 6. Configure test suite

The primary thing to configure here is getting the test suite to properly clean database tables for test runs. Whether you're using Minitest, RSpec, or something else, you'll want to modify the method that runs before every test run. In my case, it was Minitest, so it looked like this:

```ruby
# test/test_helper.rb

# ...
class ActiveSupport::TestCase
  # Run some procedures before every test case in the suite.
  #
  # @return [void]
  def before_setup
    super

    # Reset DynamoDB tables.
    #
    # Ref: https://github.com/Dynamoid/dynamoid#test-environment
    Dynamoid.adapter.list_tables.each do |table|
      Dynamoid.adapter.delete_table(table) if table =~ /^#{Dynamoid::Config.namespace}/
    end
    Dynamoid.adapter.tables.clear
    Dynamoid.included_models.each { |m| m.create_table(sync: true) }
  end
end
# ...
```

## ...profit! 🎉

Now we should be able to simply run `docker-compose up` and our local application should be using DynamoDB tables without any trace of Active Record left!

I would like to note that for most Rails projects, using DynamoDB is probably not advisable. However for cases where it actually makes sense, I hope this post can serve as a good reference.
