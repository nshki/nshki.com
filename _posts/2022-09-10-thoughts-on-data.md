---
title: Thoughts on data
description: This is, in no particular order, a collection of my thoughts around data and how we might better approach it when writing software.
---

Over the past several years, I’ve been doing quite a bit of work with data. This was through setting up systems to collect data from various APIs or webhooks, transforming the data so it’s more usable, documenting changes, handling errors, etc. And I’ve noticed that this particular area has been the wild west, particularly in the context of teams. There aren’t a lot of “data best practices” floating around in popular tech reading.

This is, in no particular order, a collection of my thoughts around data and how we might better approach it when writing software.

### Keep raw data

When you reach out to an API or process webhook payloads for chunks of data, keep everything in the exact format you received it. This could be in a Postgres `jsonb` column, a separate table, or a separate database entirely. The point is that you’re more likely than not going to need to revisit that raw data at some point whether it’s to correct discrepancies or help debug something. It’s much better to have records of the raw data than to have to collect all of it again.

### Normalize that data

Having the raw data is great but don’t be using it directly in your app. Create tables with explicit columns that parse out the relevant bits if you’re using a relational database. Make it easy to understand. Set good indexes. Thinking through this is important if you want a performant and maintainable application.

### Use background jobs

Data processing generally takes time, especially when dealing with large data sets. Queue them as background jobs. Stagger them to respect any API rate limits. Have retry mechanisms in place in case anything goes wrong.

### Batch things wherever possible

Whenever you’re inserting/updating/upserting rows or documents, batch them. It makes a world of difference when you can do it in one query vs N+1.

### Encrypt sensitive bits

Personally identifiable information (PII), credit card numbers, social security numbers, and things of that nature should never be stored unencrypted. If they’re present in the raw data, encrypt that too.

### Get agreement on and document events

I use the term “events” loosely here, but a lot of teams like to have analytics data in a platform like Mixpanel, Segment, etc. The data that goes into these platforms need to be well-documented and most importantly have stakeholder alignment. It’s going to be a bad time if everyone is free-handing all sorts of event names with inconsistent payloads that fire at unexpected times.

### Bring in your data team

If you have a data division at your org, bring someone in from their team. They’re going to have to access this data at some point too, and their role is entirely around data. Chances are they’re going to have really great suggestions on how to collect, structure, and analyze the data that you didn’t think about.
