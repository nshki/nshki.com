---
title: Reflections on a custom "Component"
description: My thoughts on defining a JavaScript pattern that I called "component" from pre-React days.
date: 2019-03-10 12:00:00 -0000
---

_This post is a collection of my thoughts, both good and bad, on defining a JavaScript pattern that I called "Component" prior to adopting React._

### Background

In 2016, my interest in front end frameworks like React started growing, but I hadn't committed to learning one yet. My day-to-day was heavily in Ruby on Rails, and I was a big fan of CoffeeScript for its likeness to Ruby and its ES6-like features before tooling like Babel and Webpacker really took off.

I loved the idea of componentizing an application but was still married to the more traditional idea of separation of concerns, where markup, styles, and behavior should be separate. The spark to writing my "Component" was the question, "How can I maximize the reusability of JavaScript while isolating functionality like lego pieces?"

### The Component Class

Before moving on, here's a slightly stripped down version of what the `Component` class looked like in a project that used jQuery:

```coffeescript
# component.coffee

class Component
  # @param {String} name
  # @param {Array<String>} targets
  # @param {Function} functionality
  # @return {void}
  constructor: (name, targets = [], functionality) ->
    selector = "[data-component='#{name}']"

    $(selector).each ->
      config =
        element: this
        selector: selector

      # Register target selectors.
      targets.forEach (t) ->
        targetAttr = "data-#{name}-#{t}"
        targetName = $(config.element).attr(targetAttr)
        config[t] = "[data-#{name}-target='#{targetName}']"

      # Run passed function with config object.
      functionality(config)
```

At its core, it really isn't a lot of code, but it allows for a way to define reusable, isolated functionality in a way that is incorporated into markup purely through `data` attributes. In practice, it was very similar to using something like [Atomic CSS](https://acss.io/).

An instance of `Component` takes three arguments:

- `name`: A string that gets used to identify base elements that use this functionality.
- `targets`: An array of strings that define other elements that are affected by this functionality.
- `functionality`: A function that runs for every base element that uses this functionality.

### Component in Action

An example usage of `Component` to be able to easily show/hide elements via an `.is-active` CSS class would be something like:

```coffeescript
# toggler.coffee

new Component 'toggler', ['toggleable'], (c) ->
  $(c.element).on 'click', () ->
    $(c.toggleable).toggleClass('is-active')
```

This instance defines a new `Component` called `toggler` that toggles an `.is-active` CSS class on its `toggleable` target on click.

The function that we pass as an argument to the constructor can reference each instance of a `toggler` via `c.element` and can also reference each `toggler`'s unique target via `c.toggleable`.

That's it. That's all the JS we need for this functionality. Now for the markup:

```html
<button
  data-component="toggler"
  data-toggler-toggleable="toggleable-a"
>
  Show/Hide A
</button>

<button
  data-component="toggler"
  data-toggler-toggleable="toggleable-b"
>
  Show/Hide B
</button>

<div data-toggler-target="toggleable-a">
  <p>A: I can be shown or hidden!</p>
</div>

<div data-toggler-target="toggleable-b">
  <p>B: I can be shown or hidden!</p>
</div>
```

We create two `<button>` elements that will toggle different elements on click by giving them `data-component="toggler"` attributes. We know which elements will be toggled by each button via their `data-toggler-toggleable` attributes, which have unique values. Finally, we create two `<div>`s that are targets of each button, denoted by the `data-toggler-target` attribute and a unique value that matches with the `data-toggler-toggleable` attribute on the base element.

Obviously, the CSS also needs to be written, but assuming it is, we've successfully defined what a `toggler` is and we can sprinkle it throughout the application by just defining some `data` attributes.

Here's an accompanying pen:

<iframe height="350" style="width: 100%;" title="Component" src="https://codepen.io/nshki_/embed/vPJGym/?height=265&theme-id=0&default-tab=js,result" allowfullscreen></iframe>

### The Good

This pattern allowed the team I was with at the time to write very modular pieces of functionality that were usable across multiple projects. We dropped in CoffeeScript files, attached some `data` attributes, and voila, things worked.

This was a huge win.

Not only did it reduce development time on individual projects, it created an opportunity for the team to define and maintain a library of functionality that could be tested in isolation and baked into a company project starter.

This also made it so it was possible to identify all DOM elements on a page that were being used for particular functionalities, which seemed like one step toward the right direction in a traditional separation of concerns mindset.

### The Bad

The number one biggest problem with this pattern was that I neglected to write documentation.

One of the projects that `Component` was used in got passed off entirely to the client, who was building its own engineering team at the time. Unfortunately, the hand-off timeframe was criminally short, and I hadn't written any decent documentation or had enough time to bring the client team up-to-speed on the pattern.

Needless to say, in a fast-paced environment, the pattern just created a swamp of uncertainty and introduced bugs on bugs on bugs.

I felt an insiduous amount of guilt.

Additionally, while the pattern worked as intended internally, it _did_ make the markup gain some serious weight. Parsing through mountains of `data` attributes is a strenuous process, and a new breed of bugs was created where attribute value typos had serious consequences.

### Closing Thoughts

Overall, I'm glad I went through the motions of writing this pattern. Not only did it create real value for my team at the time, but it gave me some perspective and great empathy for the developers in the world that create tooling for other developers.

Moving forward, I want to be more considerate of how easily other developers can use something I write. An intuitive API as well as well-maintained documentation is just as important as the tool itself.

As a side note, when [Stimulus](https://stimulusjs.org/) was released by Basecamp, I felt much better about some of the design decisions I made when writing `Component`, since the concept of targets was extremely similar.
