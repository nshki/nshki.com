---
title: Adding a Cypress test suite to your full stack Next.js app
description: A guide to add Cypress and CI to a Next.js app configured with a database.
date: 2021-08-18 12:00:00 -0000
---

[Next.js](https://nextjs.org/) is undoubtedly a powerful way to build React apps. With its recent addition of API routes, it can actually serve as a full stack toolkit to build web applications.

Recently, I started helping out with a full stack Next.js app (database and all) and wanted to add end-to-end integration tests. [Cypress](https://www.cypress.io/) was the natural framework to reach for, and I was surprised to find that there weren't very many guides out there for adding it to Next.js apps. Specifically, there weren't very many guides for adding Cypress to Next.js apps that interact with databases.

This post is my stab at one of those guides.

## Installing the packages

First off, we need to add the necessary package to run Cypress:

```bash
yarn add cypress --dev
```

We'll also add a handy package called [`start-server-and-test`](https://www.npmjs.com/package/start-server-and-test) which will be used to automate booting up and tearing down the app when the test suite runs:

```bash
yarn add start-server-and-test --dev
```

And finally, we'll add a package called [`dotenv-flow`](https://www.npmjs.com/package/dotenv-flow) which lets us easily manage environment variables in development and test environments:

```bash
yarn add dotenv-flow --dev
```

## Creating the test database

We'll want to create a separate test database so we don't clobber development databases with test data. This will heavily vary depending on your use case, but the general steps should be more or less the same:

1. Create a new local test database and user.
2. Keep its database connection string in `.env.test.local` which will automatically be used in test environments thanks to `dotenv-flow`.
3. Use the connection string to connect to and interact with your database in your app.

### Example for PostgreSQL

```
$ createdb my_app_test
$ psql my_app_test
psql_test=# create user YOUR_USERNAME with password 'YOUR_PASSWORD';
psql_test=# grant all privileges on database my_app_test to YOUR_USERNAME;
```

```
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/my_app_test"
```

## Adding the scripts

Now let's add some scripts to `package.json` to automate running Cypress in a test environment.

```json
{
  "scripts": {
    "dev:test": "next dev -p 3001",
    "cy:open-only": "cypress open",
    "cy:run-only": "cypress run",
    "cy:open": "NODE_ENV=test dotenv-flow -- start-server-and-test dev:test 3001 cy:open-only",
    "cy:run": "NODE_ENV=test dotenv-flow -- start-server-and-test dev:test 3001 cy:run-only"
  }
}
```

A couple points of interest here:

- We add a `dev:test` command that starts our Next.js app on port 3001. This is to avoid any port conflicts when, say, we want to run the test suite at the same time we have a development environment running.
- We specifically set `NODE_ENV=test` when running the main Cypress commands to have `dotenv-flow` automatically read our `.env.test.local` file to grab the database connection string.
- We have `cy:open` and `cy:run` to easily let us access the Cypress Electron app or just run in the command line.

## Running Cypress for the first time

Now let's finally run Cypress. The first run will generate files in your project that will serve as the foundation of your suite.

```
yarn cy:open
```

If you haven't used Cypress before, this will open an Electron app that gives you a nice UI to configure and run your tests. At this point, you should see a new `cypress/` directory in your project as well as a `cypress.json`. Let's tweak that `cypress.json` file to look like this:

```json
{
  "baseUrl": "http://localhost:3001"
}
```

This is so Cypress automatically prepends any paths with that URL when we want to run `cy.visit()`.

If you've made it this far, you're now ready to start writing your integration tests and running them locally, congrats! 🎉

## Configuring CI

This is another step that will vary depending on your use case, but for the sake of example, let's set up a new workflow in GitHub Actions that will run our Cypress suite on every pull request.

Add a new workflow file at `.github/workflows/e2e_tests.yml`:

```yaml
name: E2E tests (Cypress suite)
on: [pull_request]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: "Setup Postgres database"
        uses: harmon758/postgresql-action@v1
        with:
          postgresql version: "13"
          postgresql db: ${{ secrets.POSTGRES_DB }}
          postgresql user: ${{ secrets.POSTGRES_USER }}
          postgresql password: ${{ secrets.POSTGRES_PASSWORD }}
      - name: "Setup Yarn dependencies"
        uses: bahmutov/npm-install@v1
        with:
          install-command: yarn --frozen-lockfile
      - name: "Run migrations"
        run: yarn db:migrate
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      - name: "Run Cypress"
        uses: cypress-io/github-action@v2
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        with:
          command: yarn cy:run
```

This example workflow makes a couple assumptions:

- You have `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `DATABASE_URL` added to your GitHub repo's secrets.
- You have a `db:migrate` script setup in `package.json` which migrates your database and sets up the correct schema for your project.

Now try opening a new PR and celebrate the fact that your test suite now runs on each PR. 🎉

# Wrapping up

It took me a minute to piece together this particular configuration when I first went through it, so I hope this post can serve as a solid reference for anyone looking to setup end-to-end tests for their Next.js app. Special thanks to [Ash Connolly's post on setting up Cypress in Next.js](https://dev.to/ashconnolly/how-to-quickly-add-cypress-to-your-next-js-app-2oc6). I used his guide as a stepping stone to get to where this ended up.

And finally, feedback is welcome! Feel free to reach out for any comments, questions, or suggestions.

Happy coding.
