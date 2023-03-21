---
title: "How to: Selenium with Chrome extensions"
description: This is an overview of how to use Selenium to automate Chrome extensions with JavaScript.
date: 2023-03-20 22:12:00 -0700
---

When developers chat about browser automations, [Selenium](https://www.selenium.dev/) is one of those tools that’ll get mentioned in every conversation. It has native language bindings with C#, Ruby, Java, Python, and JavaScript, so it’s super flexible. This is an overview of how to use Selenium to automate Chrome extensions with JavaScript, but the concepts can be generalized to fit your browser and language of choice.

## Setting up the project

First things first. Let’s fetch the [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) NPM package.

```bash
$ npm install --save selenium-webdriver
```

Make sure you have the following installed on your system as well:

- Google Chrome
- [Chromedriver](https://chromedriver.chromium.org/downloads) (alternatively, you could also [install the NPM package](https://www.npmjs.com/package/chromedriver))

From there, we can set up a new Node.js script that will fire up a new Selenium Chrome instance.

```jsx
// selenium.js (or anything you want to name this file)

(async () => {
  const { Builder } = require('selenium-webdriver');
  const chrome = require('selenium-webdriver/chrome');
  const driver = await new Builder().forBrowser('chrome').build();
})();
```

## Starting Selenium Chrome with extensions

Now this is where things get interesting. There are multiple ways to add extensions to Selenium Chrome.

### Method 1: Loading with a local directory

This is likely what most people need when automating using extensions. If you already have the local extension build on your machine, you can just use that. Let’s add that into the script.

```jsx
(async () => {
  const { Builder } = require('selenium-webdriver');
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();  // <------
  options.addArguments('--load-extension=/path/to/extension/build');  // <------
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();  // <------
})();
```

### Method 2: Loading with a CRX file

CRX files are Chrome extension files. They are extensions bundled up into one file for nice portability. When you want to load in an extension that you aren’t actively developing, this might be the only way to do so. CRX files are obtainable using other extensions like the [CRX Extractor/Downloader](https://chrome.google.com/webstore/detail/crx-extractordownloader/ajkhmmldknmfjnmeedkbkkojgobmljda) or online tools.

Once you have a CRX file, you can load it in like so:

```jsx
(async () => {
  const { Builder } = require('selenium-webdriver');
  const chrome = require('selenium-webdriver/chrome');
  const options = new chrome.Options();
  options.addExtensions('/path/to/extension.crx'); // <------
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();  // <------
})();
```

## Interacting with extensions

If your extension has its own page that opens in a browser tab or as a pop-up, chances are your automation needs to interact with the associated DOM elements. The way to do this is to change Selenium’s currently active window to the extension’s. [Selenium’s windows API](https://www.selenium.dev/documentation/webdriver/interactions/windows/) lets us accomplish this.

Each window has an associated window ID, which is a set of randomized alphanumeric characters. You can get the current or full list of all windows in the browser session with a method call.

```jsx
const currentWindowHandle = await driver.getWindowHandle(); // => This returns a `string`
const windowHandles = await driver.getAllWindowHandles(); // => This returns a `string[]`
```

And you can switch the currently active window like this:

```jsx
await driver.switchTo().window(windowHandles[0]);
```

All driver calls are for the currently active window. That means we could write something like this, too:

```jsx
// Store all window handles in a variable.
const windowHandles = await driver.getAllWindowHandles();
let windowHandleIndex = 0;

// Keep switching to the next window until we open one with a title value of
// "My Extension".
while (await driver.getTitle() !== 'My Extension') {
  windowHandleIndex++;
  const nextWindow = windowHandles[windowHandleIndex];
  await driver.switchTo().window(nextWindow);
}

// Make Selenium driver calls per usual.
await driver.findElement(By.xpath('//button[contains(text(), "Submit")]')).click();
```

## Closing thoughts

As mentioned earlier in this post, these concepts can be applied to different browsers and languages. Loading local extensions for Firefox or Safari can be done in similar ways, and CRX files can be used for all Chromium-based browsers. (Looking at you, Microsoft Edge.)

Browser automations can really take us a long way as developers, and it’s nice knowing how to throw browser extensions into that mix. While we commonly use them for end-to-end testing, the use cases really can span anything we want.

I hope that this article proves useful to others out there, and keep building awesome software!
