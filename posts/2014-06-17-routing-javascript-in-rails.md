---
title: Routing JavaScript in Rails
date: 2014-06-17
description: My take on extending Paul Irish's DOM-ready JS execution technique.
---

This post is inspired by Paul Irish’s [original post on DOM-ready execution](https://www.paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/) and also by my coworker [Danny](http://www.danielsellergren.com/).

I’ve been working on JavaScript-heavy Rails projects lately, and it quickly became apparent that a sensible JavaScript architecture was needed to keep things in order. As I browsed through the repositories of other projects to see what others have done in the past, I found an interesting object called `UTIL`.

```javascript
UTIL = {
  exec: function(controller, action) {
    var ns     = VAW,
        action = (action === undefined) ? "init" : action;

    if (controller !== "" && ns[controller] && typeof ns[controller][action] == "function") {
      ns[controller][action]();
    }
  },

  init: function() {
    var body       = document.body,
        controller = body.getAttribute("data-controller"),
        action     = body.getAttribute("data-action");

    UTIL.exec(controller, action);
  }
};
```

I was referred to an article written by Paul Irish from a few years ago, and was immediately intrigued. By tacking on data attributes on the body tag, you’re able to neatly “route” the execution of JavaScript using the `UTIL` object:

```html
<body data-controller="<%= controller_name %>" data-action="<%= action_name %>">
```

```javascript
var controllerName = {
  actionName: function() {
    // this code will only execute on controllerName#actionName!
  }
};
```

Genius.

I wanted to take it one step further.

This set up better organized JavaScript without the bloat of JavaScript frameworks, and because recently I’ve been pushing for components-based front end architectures, I wanted to incorporate this routing technique with modules.

Modules in JavaScript are essentially a set of namespaced, re-usable functions that define the behavior of app components (a modal, for example), like so:

```javascript
var MyModal = {
  init: function() {
    // code...
  },

  show: function() {
    // code...
  },

  hide: function() {
    // code...
  }
};
```

While Paul Irish’s routing technique encourages “modules” to an extent, it does not directly translate into re-usable bundles of code, since it’s possible to still have to repeat yourself across multiple actions.

So, here’s my take on using modules with routing (in CoffeeScript). The `javascripts/` directory should look like this:

```
javascripts/
|_ config/
|  |_ namespace.coffee
|  |_ router.coffee
|  |_ routes.coffee
|
|_ modules/
|_ vendor/
|_ application.js.coffee

```

The `config/` directory will contain three files: `namespace.coffee`, `routing.coffee`, and `router.coffee`.

```coffeescript
#===============================================================================
# namespace.coffee
#
# Defines a custom namespace for the application.
#===============================================================================

window.NS = {}
```

The namespace config file will simply define the primary namespace of the app. We’re assigning it to `window` so that it’s accessible globally. `NS` should be changed to the name of your app.

```coffeescript
#===============================================================================
# router.coffee
#
# Routes execution of scripts based on controller-action pairs.
#===============================================================================

NS.router =

  # Run on document load. Gets controller and action of current page and
  # executes corresponding scripts.
  init: ->
    body       = document.body
    controller = body.getAttribute("data-controller")
    action     = body.getAttribute("data-action")
    this.exec(controller, action)

  # Executes a function in the application namespace.
  # @param {string} - controller
  #        {string} - action
  exec: (controller, action = "init") ->
    if NS[controller] && typeof NS[controller][action] == "function"
      NS[controller][action]()

# Initialize router
document.addEventListener "DOMContentLoaded", -> NS.router.init()
document.addEventListener "page:load",        -> NS.router.init()
```

This is a direct translation of Paul Irish’s UTIL object into CoffeeScript. I’m opting to use `addEventListener` to add DOM-ready events to make this architecture independent of jQuery. The `page:load` event is necessary only if you’re using Turbolinks.

```coffeescript
#===============================================================================
# routes.coffee
#
# Defines custom routes for script execution.
#===============================================================================

NS.my_controller_name =
  my_action_name: ->
    NS.my_module_name.init()
```

Now, the routes file is where different modules are initialized on a per-action basis. This means that we can neatly separate modules into their own files without worrying about which actions it should be used on, then connect them using `routes.coffee`.

This has worked fairly well on the projects I’ve implemented this on.

`routes.coffee` can get cluttered rather quickly, however, and that is something to be improved upon in the future.
