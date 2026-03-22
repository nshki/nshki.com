---
title: Open source chats with Kasper Timm Hansen
description: Some nuggets of wisdom that Kasper Timm Hansen touched on while we chatted on a Hollywood rooftop.
date: 2022-10-16 12:00:00 -0000
---

Last week I attended the [Rails SaaS Conference](https://railssaas.com/), which is a brand new conference revolving around Ruby on Rails and entrepreneurship. Despite writing Rails apps for a while now, I haven’t been very involved in the community, so I wanted to branch out a bit and meet the wider Rails community.

The conference was an incredible experience, but that’s not what I wanted to write about today. (Read [Eric Berry’s wonderful write-up of the experience](https://berry.sh/the-rails-saas-conference/) if you’re curious on that front!) I wanted to capture some nuggets of wisdom that [Kasper Timm Hansen](https://twitter.com/kaspth) touched on while we chatted on a Hollywood rooftop.

For those who aren’t familiar, Kasper is a former Rails core member who has made major contributions to the framework. I ran into him while scanning around the second floor lobby for a bottle of water, where we greeted each other for the first time. He told me about his 11-hour flight from Denmark and I told him about my 30-minute Uber ride from home. We shared jokes about how I should craft an intricate travel story because I'm a local. (I didn’t end up doing this.) He’s super personable and extremely humble.

Later during the day, I asked him what he’d recommend to someone like me who has aspirations to eventually contribute to Rails. What he said really stuck with me.

## Read bits of the codebase at a time

This one was a very new idea to me. I used to have a preconception that in order to contribute to an open source project, a good place to start would be to browse its GitHub issues or something similar. Kasper suggested that reading little bits of the codebase at a time would be a good first step.

No one understands Rails 100%. There are tens of thousands of lines of code with new contributions all the time. Reading bits over time, whether through [api.rubyonrails.org](https://api.rubyonrails.org) or source code, with the intent to understand will help someone like me get a foot in the door by accumulating some domain knowledge.

In Kasper's own words:

> "I like to think of reading the layers of code as drilling into the ground, viewing the different sediments until you hit bedrock (and then you know this piece). Then picking a different spot to drill into, so you learn bit by bit, but enough that you have a solid understanding for one piece."

## Reading leads to learning

Library code is very different from application code. Code that is kosher in a consumer-facing application might not fly very well in a library. There are many more nuanced considerations like:

- What could the downstream impacts of this seemingly tiny change be?
- How difficult might it be to maintain this change over time across different people?
- There are deprecation cycles in libraries—you can't just yank things from them. Is this change as "correct" as possible so we mitigate the risk of deprecating in the future?
- Is this change targeting too specific a use case to be included in a library?

Reading and learning small bits of the codebase over time will shed light on these things and many more. Kasper brought up a great point that this will probably expose features of Ruby that aren’t quite as common in the application world. Learning all of these things will eventually make you a better programmer in general.

## Make learning the goal

Finally, this was a really great mindset shift that he proposed: dive into Rails with the goal of learning. If a contribution eventually results from it, great, but what’s more important is that community members are leveling up from delving into Rails.

I love this community mindset. Rails should be about enabling developers to quickly build maintainable software and its community is aiming to grow everyone into better programmers.

Learnings from Rails would absolutely be applicable in any other project, whether that’s another gem, another framework, or even another programming language. Not everything you learn in private app contexts is applicable to open source, but learnings from open source will almost always be applicable to private apps. In the long run, the value of that outweighs any number of issued PRs, whether accepted or rejected.

## Closing thoughts

To sum it up: read little bits of code at a time, slowly gain understanding of a specific domain, and do it all with the intent of getting better. There are a lot of higher-level themes in these ideas like curiosity, empathy, and community, and I’m sure I’ll still be noodling on them for the foreseeable future.

I feel like my chats with Kasper has already helped change how I think about open source, and I hope they can do the same for you.
