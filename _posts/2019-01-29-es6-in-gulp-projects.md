---
layout: post
title: ES6 in Gulp Projects
date: 2019-01-29
permalink: /es6-in-gulp-projects/
description: How to setup a Gulp project to use ES6 and still use libraries such as jQuery.
---

_This post covers how to setup a Gulp project to use ES6 and also accounts for usage of libraries such as jQuery._

**Update as of July 19th, 2019**: Thanks to [@regiscamimura](https://twitter.com/regiscamimura) for pointing out that the Rollup NPM package is now required for this process to work. The article has been updated to reflect that!


### Preface

The front end development landscape is changing extremely quickly. React, Redux, Vue, Vuex, Webpack, and SPAs are just a few of the hot phrases you'll see today. However, many teams and individuals still use [Gulp](https://gulpjs.com/) -- it is a tried and true build tool and sometimes from an operational standpoint, it makes sense for it to continue to be used.

Even if adopting React, Vue, or some other front end framework is not a viable option for some, adopting ES6 certainly is. ES6 is the next iteration of JavaScript that introduces many new features, and while not all browsers have it fully implemented, they are certainly on their way to do so.

I won't make any assumptions about your current setup, so this post will setup a Gulp configuration from scratch so that you can cherry-pick missing pieces and start writing ES6 in your projects today.


### Setup NPM and Dependencies

If you haven't already [installed Node and NPM](https://nodejs.org/en/) on your system, do so before proceeding.

Let's setup [NPM](https://www.npmjs.com/) so you have access to all the packages we will be using.

```bash
$ npm init
```

Follow the prompts, and you'll have a `package.json` in your directory. Now let's install some development dependencies.

```bash
$ npm install --save-dev @babel/core gulp gulp-better-rollup rollup rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-commonjs
```

That seems like a mouthful, what did we just install?

- [@babel/core](https://www.npmjs.com/package/@babel/core) -- A tool that transpiles ES6 code into JavaScript that any browser will understand.
- [gulp](https://www.npmjs.com/package/gulp) -- Our build tool. :)
- [gulp-better-rollup](https://www.npmjs.com/package/gulp-better-rollup) -- A Gulp plugin that allows us to use [Rollup](https://rollupjs.org/guide/en), a module bundler that allows us to use ES6 imports and exports in our code.
- [rollup](https://www.npmjs.com/package/rollup) -- The module bundler referenced above.
- [rollup-plugin-babel](https://www.npmjs.com/package/rollup-plugin-babel) -- A Rollup plugin that integrates Babel into the bundling process.
- [rollup-plugin-node-resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve) -- A Rollup plugin that allows us to use third party modules in `node_modules/`.
- [rollup-plugin-commonjs](https://www.npmjs.com/package/rollup-plugin-commonjs) -- A Rollup plugin that converts [CommonJS](https://en.wikipedia.org/wiki/CommonJS) modules to ES6 so we can import them without issues.


### Configure Gulp

Install the Gulp command line tool if you haven't done so already:

```bash
$ npm install --global gulp-cli
```

Now let's create and configure our `gulpfile.js`.

```jsx
const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

gulp.task('scripts', () => {
  return gulp.src('js/*.js')
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(gulp.dest('dist/'));
});
```

This configuration defines a new Gulp task called `scripts`, which will run with `gulp scripts`. It looks in a directory called `js/` for any `.js` files, runs Rollup against them, and outputs the result in a directory called `dist/`. You can change the `gulp.src` and `gulp.dest` to what's appropriate for your project.

We configure Rollup to use Babel, allow for importing third party modules from `node_modules/`, and allow importing any modules written in CommonJS. We specify an output format of `umd`, which is compatible with the most environments (browser, Node, etc.).

Go ahead and drop a JavaScript file in `js/` and run `gulp scripts`. It'll transpile a resulting file in `dist/`, a good first step! Of course, you'll probably just want one JavaScript file in the root of the `js/` directory and import the rest with ES6 syntax.


### What If I Still Need To Use jQuery?

[jQuery](https://jquery.com/) is still widely used and it could be too much of an effort to phase out of an existing system, especially if a million jQuery plugins are in play. If you can't abandon jQuery and/or also want to keep all front end dependencies managed through NPM (as opposed to CDNs or keeping them in the project repo), then read on.

Let's add jQuery as a project dependency.

```bash
$ npm install jquery
```

Now in a JavaScript file, we can use it like so:

```jsx
import $ from 'jquery';

$(document).ready(() => {
  console.log('Look ma, no CDNs!');
});
```

That's great. However, when there are jQuery plugins that depend on a globally available jQuery object, things get weird. As an example, I'll use a plugin called [fancyBox](https://www.npmjs.com/package/@fancyapps/fancybox).

```jsx
import $ from 'jquery';

// This looks in the `node_modules/` directory thanks to
// rollup-plugin-node-module. We can find the path to the minified
// JavaScript by manually looking in the `node_modules/` directories
// ourselves.
//
// We don't assign the import to any variable, since most jQuery
// plugins simply extend jQuery by adding new methods developers
// can use in their code. e.g. $('.my-element').myPluginMethod();
//
// Also, per ES6 imports, we can omit the `.js` at the end.
import '@fancyapps/fancybox/dist/jquery.fancybox.min';
```

If we run this through Gulp and load it on a web page, we get a JavaScript error:

```
ReferenceError: jQuery is not defined
```

Boo. Why?

A good first guess might be because we simply imported jQuery as a variable `$`, not as `jQuery`. We could try rewriting the first line, perhaps?

```jsx
// This won't fix the error.
import jQuery from 'jquery';
import '@fancyapps/fancybox/dist/jquery.fancybox.min';
```

Unfortunately, this results in the same error. This is because jQuery plugins look for a globally defined `jQuery` object at runtime, and our transpiled files will always be protected from polluting the global scope (this is a good thing).

As a second stab, we could try this:

```jsx
// This also won't fix the error.
import $ from 'jquery';
window.jQuery = $;
import '@fancyapps/fancybox/dist/jquery.fancybox.min';
```

Alas, same error. Why would assigning jQuery to the global scope not work either? This is because Rollup processes all imports first. This means that in our transpiled file, all of our imported modules are outputted _before_ any of the JavaScript we write.

In this case, that means our `window.jQuery = $;` appears _after_ our jQuery and fancyBox code.

With this knowledge, I propose this final solution:

```jsx
// js/config/jqueryLoad.js
import $ from 'jquery';
window.$ = $;
window.jQuery = $;

// js/index.js
import './config/jqueryLoad';
import '@fancyapps/fancybox/dist/jquery.fancybox.min';
```

With this multifile approach, we're doing a couple things:

1. We delegate the importing of jQuery to a separate file `jqueryLoad.js` that also assigns `$` and `jQuery` in the global scope.
2. We import our newly created config file before any plugins.

Now when Rollup transpiles our root JavaScript files, it will output our imported code first, meaning that the contents of `jqueryLoad.js` will appear before any of the jQuery plugin code.

You may now open your bottle of champagne.


### Closing Thoughts

There's nothing wrong with using tools that aren't the latest and greatest, especially if there are organizational and operational reasons for it. At the same time, it's nice to have a little taste of the future as well.

I hope this can come in handy for some of you. Code on.
