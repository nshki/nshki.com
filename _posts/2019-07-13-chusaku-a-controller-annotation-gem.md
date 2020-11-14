---
layout: post
title: Chusaku, a controller annotation gem
date: 2019-07-13
description: A write-up of a Rails controller annotation gem.
---

I'm an avid user of [Annotate](https://github.com/ctran/annotate_models), a lovely gem written by [Cuong Tran](https://github.com/ctran) that annotates various Rails project files with summaries of the database schema. Without flipping back and forth between models, factories, and `schema.rb`, the annotations allow me to see what columns are present in relevant tables at a quick glance.

[Chusaku](https://github.com/nshki/chusaku), which is a play on the Japanese word 註釈, is a Rails controller annotation gem that I wrote a couple months prior to scratch my own itch of wanting to see route info directly in controller files.

Take for example the following:

```ruby
class TacosController < ApplicationController
  def create
    # ...
  end

  def destroy
    # ...
  end
end
```

We have a very simple controller that handles the creation and destruction ("nomming") of delicious tacos. However, just by looking at this file, I have no idea if these actions correspond to any routes in my Rails project.

With Chusaku, we can simply run:

```
$ bundle exec chusaku
```

And our file would then look something like:

```ruby
class TacosController < ApplicationController
  # @route POST /make-myself-a-taco (create_taco)
  def create
    # ...
  end

  # @route DELETE /put-the-taco-in-my-tummy (eat_taco)
  def destroy
    # ...
  end
end
```

We can see the HTTP verb, path, and route name that corresponds to each action.


## Strategy

As a programmer, I thought it would be fun to tackle this problem from scratch. How would I parse my controller files and annotate only the actions that have corresponding entries in my routes?

### Step 1: Gather routes info from Rails

First, I needed to somehow parse a project's routes. The only way I knew how to quickly see a project's routes was with:

```
$ bin/rake routes
```

But parsing CLI output for the purpose of this project seemed awful. After a bit of digging, I found that Rails _does_ expose its routes info in Ruby. This led to the creation of [Chusaku::Routes](https://github.com/nshki/chusaku/blob/master/lib/chusaku/routes.rb).

### Step 2: Parse controller files

While this step is fairly obvious, the details of it took me a second. I should open a file for reading, yes, but I also need to be able to tell if what I'm looking at corresponds with a route in Rails.

Using Chusaku::Routes, I know what routes are available to me, so how can I find relevant actions? Regular expressions. By extracting the name of an action, I can check to see if any route matches it.

Great.

But now what? I want to insert an annotation above the action, but what if there is already a comment that exists? What if an annotation already exists?

At this point, I decided that being able to categorize lines of a file into three buckets was necessary. The buckets are:

- _Action_: a line that defines an action
- _Comment_: line(s) that are purely comments
- _Code_: anything else

This is how I pictured it in my head:

![Visualization](/assets/posts/chusaku-a-controller-annotation-gem/visualization.png)

This led to the creation of [Chusaku::Parser](https://github.com/nshki/chusaku/blob/master/lib/chusaku/parser.rb).

### Step 3: Annotate

Finally, I just want to write annotations above actions in each controller file where applicable. Using both Chusaku::Routes and Chusaku::Parser, I was able to insert annotations where necessary and was also able to prevent edge cases where annotations already existed or was no longer needed.

This leads us to the main module, [Chusaku](https://github.com/nshki/chusaku/blob/master/lib/chusaku.rb).


## Closing Thoughts

Writing Chusaku was incredibly fun and I intend to continue using it for my Rails projects. You can see the repo and associated test suite [here](https://github.com/nshki/chusaku). If you like the project, please consider starring it on GitHub, and if you see any problems, please file an issue or open a pull request!
