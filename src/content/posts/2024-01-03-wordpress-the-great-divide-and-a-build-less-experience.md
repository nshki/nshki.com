---
title: WordPress, the Great Divide, and a build-less experience
description: How a small WordPress project got me thinking about the Great Divide and feeling the joys of a build-less development experience.
date: 2024-01-03 21:06:00 -0800
---

I recently worked on a small WordPress project for a client and it felt like the 2000s/2010s again. Vanilla HTML, CSS, JavaScript, PHP, MariaDB, [Advanced Custom Fields](https://www.advancedcustomfields.com/), and SFTP. NPM wasn't needed. A build step wasn't needed. In some ways, the "DX" in the lens of common workflows today wasn't great, but in other ways, it was _amazing_. And most importantly, all of that actually didn't matter as long as the end result for the user was good. There are many voices in the web industry that touch on this already, but I wanted to chip in with my own 2¢ here.

## Broaching [the Great Divide](https://css-tricks.com/the-great-divide/), again

While it's not strictly front-end development, building a fully custom WordPress theme got me thinking about topics that Chris Coyier wrote about back in 2019.

I could have decided to front-load the build process for this site with some JavaScript-based toolchains, Sass, TypeScript, and other goodies, but I deliberately decided against it. The client often works with other shops that specialize in managing a portfolio of websites. After being in contact with some of the stakeholders, it was clear that it's important to lower the barrier of entry for this project as much as possible, especially when I won't be the one maintaining it. As a result, everything on the front end was using vanilla, native technologies. HTML, CSS, and sprinkles of JavaScript.

It felt _really_ good, and it's a testament to how powerful the foundational technologies are. It's also a reminder that the front-of-the-front end is just as important, if not more important, than back-of-the-front end. e.g. With this particular project, there was no back-of-the-front end.

## Build-less CSS

I generally use vanilla CSS for most of the projects I touch nowadays, but I wanted to touch on a couple small moments of CSS joy during this project. One of my gut reactions to using a build-less setup was that separating stylesheets like in a Sass or CSS module project was not possible. But it absolutely is. `<link>`-ing individual stylesheets works perfectly especially in today's HTTP/2 world.

I structured top-level page fields for this project with ACF's (Advanced Custom Fields) Flexible Content field which I named "components." Editors can just pick which components they want to use for a page and in whatever order they like. I wrote the markup for each component in its own template part file and fired off a `wp_enqueue_style()` per each component's stylesheet in the theme's `functions.php`. This produced several `<link>` tags in the end markup, and it didn't require any build step whatsoever. Anything that needed to be shared across stylesheets was tucked away nicely in CSS variables.

(I thought about using WordPress's new block editor and creating a bunch of custom blocks, but I decided against it since that would raise the barrier to entry for any future developers. At the time of writing, [every block requires its own `node_modules/` and build process](https://developer.wordpress.org/block-editor/getting-started/tutorial/), and that's far too much of a headache to deal with.)

## Build-less JavaScript

Only a handful of small JavaScript files were needed for this project. There was no need to use anything that required a build step. The most involved JavaScript file I wrote for this project was 23 lines long, and native browser APIs handled everything that I needed.

I wanted to make the website's behavior declarative in the markup as [I've written before](/reflections-on-a-custom-component), so I used `data-component` attributes in the markup as hooks for each JavaScript file. Each file was structured something like this:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  const instances = document.querySelectorAll('[data-component="<component-name>"]');
  for (let instance of instances) {
    // ...
  }
});
```

For things like dynamic image galleries, I reached for dependencies via CDNs which helped me to continue avoiding a build step.

## Deploying like the old days

Finally, I got to use an SFTP client again. This was thrilling. Yes, it's not very efficient and is prone to all sorts of human error, but it felt _great_. Deploying changes is really as easy as drag and drop and that's exactly what I did. I gave the ol' [Filezilla](https://filezilla-project.org/) another download and dragged a directory over to the production server. Magic.

## Closing thoughts

This project was a breath of fresh air since most projects I work on nowadays require some kind of build step, whether that's through NPM or asset preprocessing, and this one didn't. It felt so freeing to write vanilla code and drag it into production. The big thing for me is that I didn't have to think as hard as I normally do for projects.

I'm not saying projects today need to be absolved of build steps or deployed via SFTP. There are very good reasons to not do either for many projects. But I do think that it's a great idea to always evaluate how much complexity is necessary for any project before a single line of code is written. Modern browsers are powerful, and as a result, vanilla HTML, CSS, and JavaScript are powerful. Not all projects are going to be managed by large teams.
