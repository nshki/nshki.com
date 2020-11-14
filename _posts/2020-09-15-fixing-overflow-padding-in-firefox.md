---
layout: post
title: Fixing overflow padding in Firefox
date: 2020-09-15
description: A look at a long-standing CSS bug in Firefox and some approaches to remedy it in your projects.
---

_Hat tip to my coworker [Dylan](https://dylanatsmith.com/) for deep-diving into this issue with me and digging up the logged bug._

Elements that scroll as its contents go beyond its given dimensions—this is a pretty common pattern in sites and apps. Unfortunately, it comes with a [9 year old bug in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=748518). It's reasonable to want padding within these scrolling elements to give your content some breathing room as you reach the end of the scroll. This bug causes the end padding to be completely ignored. [Here is a pen to demonstrate](https://codepen.io/nshki_/pen/MWyBprL).

Unfortunately, until this bug is fixed, we can't really solve this in a "correct" way. So here are some cross-browser methods to fix this issue.


## Pseudo-element that provides the padding

This is an approach that inserts an `::after` pseudo-element in the element that has `overflow` applied. You'd remove the end padding explicitly and move it into the pseudo-element.

```html
<div class="box">
  <!-- Your content here. -->
</div><!-- .box -->
```

```css
.box {
  /* These properties are dependent on the project design. */
  overflow: auto;
  max-height: 100px;
  padding: 1rem;

  /* Explicitly removing the end padding. */
  padding-bottom: 0;
}

.box::after {
  content: '';
  display: block;
  padding-bottom: 1rem; /* Should match `padding` value in parent. */
}
```

This works nicely as Firefox will render the end padding just fine and other browsers will render it the same. It's also fine to use something like `height` instead of `padding-bottom` in this example as well.


## Adding a child element in markup with the padding

This is similar to the first method except that we are explicitly including an element in the markup with the necessary padding rather than using a pseudo-element.

```html
<div class="box">
  <!-- Your content here. -->

  <div class="box__spacing"></div>
</div><!-- .box -->
```

```css
.box {
  /* These properties are dependent on the project design. */
  overflow: auto;
  max-height: 100px;
  padding: 1rem;

  /* Explicitly removing the end padding. */
  padding-bottom: 0;
}

.box__spacing {
  display: block;
  padding-bottom: 1rem; /* Should match `padding` value in parent. */
}
```


## Adding a child container element with the padding

Instead of having the parent element declare a `padding`, you can move it into a child container element.

```html
<div class="box">
  <div class="box__child">
    <!-- Your content here. -->
  </div><!-- .box__child -->
</div><!-- .box -->
```

```css
.box {
  /* These properties are dependent on the project design. */
  overflow: auto;
  max-height: 100px;

  /* Notice that this element has no padding anymore. */
}

.box__child {
  padding: 1rem; /* ...and that the child now has the padding. */
}
```


## Closing thoughts

The general strategy here is to divert the spacing to another element other than the original. Depending on your project, there are very likely other ways of tackling this problem, but I hope these general strategies help point you in the right direction.

Also...

CSS is hard. It seems deceptively simple to pick up, but the real world bugs and issues that developers run into are unlike anything you'll see in other languages.

Lots of respect to the people who work on browsers and browser engines, and lots of respect to people who write CSS.
