---
layout: post
title: HTML isn't an assembly language
date: 2020-07-12
description: Thoughts on how HTML isn't the means to an end, but an end product.
---

Back in 2005–2006, validators were all the rage. Every website had a W3C HTML valid badge to let visitors know the authors of the site really knew their stuff. It was almost ludicrous to see a site without a validator badge, and my first instinct was to run their markup through the [W3C validator](https://validator.w3.org/).

As the Web matured and newer techniques to build things came out, the attitude towards the "correctness" of HTML shifted. HTML became the vessel to ship user experiences on the Web. Whether it was valid or not mattered less as long as the interactions worked.

I'm not trying to claim that I'm a Web historian or anything because I'm not, but I would be incredibly surprised if this shift in attitude *didn't* contribute to things like progressive enhancement and accessibility not getting the attention that it really deserves.

I have friends who are getting into web development today, and the material that they're taught skews heavily on the shiny things—React, GraphQL, serverless functions, and the like. While there's nothing wrong with that, I'd love to see the fundamentals become cool again. I'd love to see an emphasis on semantics, structure, and readability become cool again.

HTML is the primary medium of the Web, yes, and that means it is *the* common denominator when it comes to things like progressive enhancement and accessibility. HTML isn't an assembly language. Make your site/app make sense and work without CSS and JavaScript first, then begin to layer everything else in.

Now *that's* cool. Let's normalize that.
