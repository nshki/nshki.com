---
layout: post
title: Managing WordPress With Composer
date: 2019-01-23
permalink: /managing-wordpress-with-composer/
summary: How to use Composer to offload WordPress core and plugin management to reduce your project's repo size.
---

_This post covers how to use [Composer](https://getcomposer.org/) to offload WordPress core and plugin management to reduce your project's repo size._


### Why Composer?

If you've ever built a website, chances are that you've built a WordPress site before. It's used by 32.9% of all websites as of January 2019 [according to W3Techs](https://w3techs.com/technologies/history_overview/content_management/all).

And if you've ever built a WordPress site before, you'll know that the codebase is fairly, well, messy.

Composer is a dependency manager for PHP that will remedy that a bit. No need to push commits that read "Upgrade all plugins" or "Upgrade WordPress" anymore. No need to check in directories and directories of files you won't ever touch if you're just building a theme. Just have a config and lock file and you're ready to rock and roll.


### Install Composer

First things first. Let's install Composer.

_Linux users_:

```
$ sudo apt install composer
```

_macOS users_:

```
$ brew install composer
```

From the root of your project, you can then run the following to setup your initial config file:

```
$ composer init
```

Answer "no" to the prompts that ask you to define dependencies interactively. We'll skip that step since a majority of WordPress-related packages aren't available through the [official Composer registry](https://packagist.org/).

You should end up with a `composer.json` that looks something like this (you can also manually create this file too, the `composer init` command just helps you through that process):

```json
{
  "name": "<name>/<project name>",
  "authors": [
    {
      "name": "<your name>",
      "email": "<your email>"
    }
  ],
  "require": {}
}
```


### Adding WordPress Packagist as a Repository

As mentioned a little earlier, the official Composer registry doesn't have most WordPress-related packages, so we'll have to use an alternate one. [WordPress Packagist](https://wpackagist.org/) is the most widely used registry for WordPress, so let's use that.

To tell Composer to look there for packages, we need to add the following section to `composer.json`:

```json
"repositories": [
  {
    "type": "composer",
    "url": "https://wpackagist.org"
  }
]

```

Now we have access to install any package from Packagist and WordPress Packagist!


### Configuring Install Paths

By default, Composer will install packages in a `vendor/` directory. While that may work for other PHP projects, that's obviously not where we want WordPress plugins, so we need to manually configure the install path ourselves.

WordPress plugins have a type of `wordpress-plugin` via WordPress Packagist, so we can tell Composer to install all `wordpress-plugin` package types to `wp-content/plugins/` by adding this section:

```json
"extra": {
  "installer-paths": {
    "wp-content/plugins/{$name}": ["type:wordpress-plugin"]
  }
}
```


### Adding Public Plugins

WordPress Packagist works by scanning the official WordPress Subversion repository every hour, so anything that you can find through the admin UI, you'll be able to find in WordPress Packagist.

To add a plugin, find the plugin on [wpackagist.org](https://wpackagist.org) and add a line like the following in the `"require"` section of `composer.json`:

```json
"wpackagist-plugin/<plugin name>": "*"
```

You can replace the `*` with a specific version number of the plugin as well -- using `*` will just tell Composer to fetch the latest version.

Once you've added all the plugins you want, run the install command and rejoice!

```
$ composer install
```


### Adding Premium Plugins

Premium plugins are generally not available via the official WordPress plugin registry. Depending on the plugin creator, there may be specific documentation to add the plugin via Composer to your project.

If no such documentation exists though, there are still ways to have Composer manage your premium plugins.

**The first is to register a plugin download link as a package.** If you have a license for a plugin, chances are you have an account on their website, and you'll be able to locate a download link for the plugin.

In that case, you can add the following to `composer.json` under `"repositories"`:

```json
{
  "type": "package",
  "package": {
    "name": "<org name>/<plugin name>",
    "version": "dev-master",
    "type": "wordpress-plugin",
    "dist": {
      "type": "zip",
      "url": "<download link here>"
    }
  }
}
```

Then add this line to the `"require"` section:

```json
"<org name>/<plugin name>": "dev-master"
```

Now when Composer looks through all the required packages and can't find `<org name>/<plugin name>` in Packagist and WordPress Packagist, it'll fall back to the package you manually registered.

We're defining the version as `"dev-master"` since most download links will give you the latest version of the plugin. If that's not the case, then feel free to swap it out for the appropriate version number. What's important is that the versions match in `"require"` and `"repositories"`.

**The second method is to self-host the premium plugin as a private repository.** This should be more or less of a last resort since you'll be responsible for updating the private repository for new versions, but this will work nicely especially in teams that use starters across multiple different projects.

Create a new private repository with your service of choice and add the plugin files to it. We want to make this private so we don't expose the premium plugin files to the world -- it's premium for a reason.

Now create a new file called `composer.json` _inside this repo_. It should be in the following format:

```json
{
  "name": "<your name>/<plugin name>",
  "description": "Self-hosted version of <plugin name>.",
  "license": "proprietary",
  "type": "wordpress-plugin",
  "require": {
    "composer/installers": "~1.0"
  }
}
```

`<your name>` should correspond to your account name on your service of choice. e.g. My username on GitHub is `nshki` so that would be what I use.

`composer/installers` is required here so that configs that install packages to custom paths can operate as expected.

Now in your WordPress repository, add the following under `"repositories"` in `composer.json`:

```json
{
  "type": "vcs",
  "url": "git@<your service>:<your name>/<repo name>.git"
}
```

`vcs` stands for version control system. The `url` can just be the SSH string your service provides for your repo.

Now you can require that plugin in the familiar format (under `"require"`):

```json
"<your name>/<repo name>": "dev-master"
```

Now run:

```
$ composer install
```

Composer should be pulling in your newly created private repo as a plugin in your project!


### Have Composer Install WordPress

If you're like me and would want _all_ dependencies to be managed by Composer for PHP projects, then read on.

On the homepage of WordPress Packagist, there's a small tid bit that refers to a couple resources for installing WordPress core itself using Composer. I'll be providing instructions for how to use [`johnpbloch/wordpress`](https://github.com/johnpbloch/wordpress).

First, just add the following dependency under `"require"`:

```json
"johnpbloch/wordpress": "*"
```

You could run the install command right after, but you'll notice that WordPress gets downloaded into a directory called `wordpress/` in the root project directory. Not what we want, assuming you want the root to correspond to the root of the WordPress site.

Now, it's important to note that by design, _Composer will wipe out directories in favor of downloaded dependencies_. This means that if packages weren't installed under `vendor/` or WordPress under `wordpress/`, our entire project could be nuked.

This means that we need to write some custom scripts to reconcile this.

Luckily, Composer allows us to do just that all from within `composer.json`. Add the following to your config:

```json
"scripts": {
  "post-install-cmd": [
    "if [ ! -f wp-load.php ]; then rm wordpress/composer.*; fi",
    "if [ ! -f wp-load.php ]; then rm -rf wordpress/wp-content/; fi",
    "if [ ! -f wp-load.php ]; then rm -rf wp-admin/; fi",
    "if [ ! -f wp-load.php ]; then rm -rf wp-includes/; fi",
    "if [ ! -f wp-load.php ]; then mv wp-content/ wordpress/; fi",
    "if [ -d wordpress ] && [ ! -f wp-load.php ]; then mv wordpress/* .; fi",
    "if [ -d wordpress ]; then rm -rf wordpress/; fi"
  ],
  "post-update-cmd": [
    "rm wordpress/composer.*",
    "rm -rf wordpress/wp-content/",
    "rm -rf wp-admin/",
    "rm -rf wp-includes/",
    "mv wp-content/ wordpress/",
    "mv wordpress/* .",
    "rm -rf wordpress/"
  ]
}
```

_Ooooookay, slow down_. Let's break this down.

`post-install-cmd` and `post-update-cmd` are hooks that are triggered after running `composer install` and `composer update`. You can [read up](https://getcomposer.org/doc/articles/scripts.md) on all the available hooks if you're interested.

Composer scripts allow us to run shell commands, and that's what we're doing here.

The general steps in English are as follows:

1. Remove Composer files from within the downloaded WordPress. This is to prevent our own from being overwritten.
2. Remove `wp-content/` from within the downloaded WordPress since we want to use our own (and so we preserve things like uploads, etc.).
3. Remove `wp-admin/` and `wp-includes/` from our root directory to prevent "directory already exists" errors when we move files.
4. Move everything from `wordpress/` into our root directory. Files get overwritten and updated.
5. Remove the `wordpress/` directory.

You'll notice that the install hook has a bunch of conditionals that check for a file called `wp-load.php`. This is to prevent the install command from nuking any existing version of WordPress -- perhaps you updated it through the admin UI, for example. The file was arbitrary, the main objective was to look for something that indicates that WordPress already exists.

The update hook doesn't care about overwriting your existing WordPress core files since that's what it _should_ do.

Now go ahead and install or update and profit!

```
$ composer install
$ composer update
```


### Ignoring WordPress Core and Plugins in Git

One of the biggest points to using Composer was to remove all this extra fluff from our project repository, no? Let's do that.

If this was an existing project, you'll need to use `git rm` to remove all WordPress core and plugins from the repository. You can use `git rm --cached` to remove it from Git but keep the files.

Add the following to your `.gitignore`:

```
# Ignoring WordPress core files (but making sure to keep themes).
/wp-content/plugins/
/wp-content/uploads/
/wp-admin/
/wp-includes/
/index.php
/license.txt
/readme.html
/wp-activate.php
/wp-blog-header.php
/wp-comments-post.php
/wp-config-sample.php
/wp-cron.php
/wp-links-opml.php
/wp-load.php
/wp-login.php
/wp-mail.php
/wp-settings.php
/wp-signup.php
/wp-trackback.php
/xmlrpc.php

# Ignoring Composer directories.
/vendor

# Allowing these explicitly.
!/wp-config.php
!/wp-content/index.php
!/wp-content/themes/
!/wp-content/themes/**
```

Your repository should now be boiled down to just the essentials.


### Closing Thoughts

Using Composer for WordPress is by no means necessary, but for someone like me who is used to using package managers like Bundler or Yarn, it's a huge boon to productivity and makes automation much easier down the line.

Deploying with Composer is quite easy as well. If you're managing your own servers, just install Composer and all you'll have to do is clone the repository and `composer install`.

If this setup works well for you or you have any questions, [please reach out over Twitter](https://mobile.twitter.com/nshki_)!
