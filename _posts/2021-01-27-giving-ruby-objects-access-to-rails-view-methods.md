---
title: Giving Ruby objects access to Rails view methods
description: A look at `view_context` and how to use them in POROs.
---

I think most Rubyists can agree that POROs (Plain Old Ruby Objects) are incredibly useful. When done right, they're easy to understand, build, and use in applications.

In the Rails ecosystem, there are many classifications of POROs: services, presenters, query objects, value objects, and so on and so forth. Sometimes we want to give these POROs access to things our application can access at the view level—maybe we want a PORO to manage generating a set of asset or route paths for us.

Luckily, it's easy! We can use something called [`view_context`](https://api.rubyonrails.org/classes/ActionView/Rendering.html#method-i-view_context).

```ruby
class MyController < ApplicationController
  def index
    # Pass a `view_context` from the controller level into a PORO.
    poro = MyPoro.new(view_context)

    # ...
  end
end

class MyPoro
  def initialize(context)
    @context = context
  end

  # Now we have access to things like...
  def example
    # Image paths.
    @context.image_path("/some/path/here")
    @context.image_url("/some/path/here")

    # Routes.
    @context.root_path
    @context.users_path

    # Other things you have access to in a view.
    @context.controller_name
    @context.action_name
    # etc...
  end
end
```

Having the flexibility to access view-level methods in a PORO is powerful for obvious reasons and can help prevent unnecessary complexity inside of templates and partials.
