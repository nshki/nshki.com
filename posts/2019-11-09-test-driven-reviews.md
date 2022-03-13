---
title: Test-driven reviews
date: 2019-11-09
description: My thoughts around using tests as the guideline for code reviews.
---

You've likely heard of test-driven development. It's a practice that involves writing automated tests before writing code that accomplishes the feature or objective you're working on. You want to write tests that fail at first and only pass when the implementation can be considered "complete". It's a very powerful way of approaching software development.

Over the past year or so, I've been more heavily involved in code reviews at my job. I've reviewed PRs that are anywhere between 3-line code changes to 70+ changed files. Code reviews can be done in a lot of different ways, and they are different from person to person.

In this post, I want to document a language-agnostic approach to code reviews that has helped me give meaningful feedback.


## Review the Tests First

By reviewing the tests first, you can get solid context of what to expect in the application code. If you feel like you're still not sure what to be looking for after reviewing the tests, that's a great indication that the tests need to be rewritten. This is like the "red" of TDD except it's for understanding the test.

This is especially important for larger PRs (your team could try enforcing smaller PRs, but at some point, large PRs are somewhat unavoidable). Also, this is important regardless of test-driven reviews because it will be applicable whenever anybody reviews any test in your codebase.

Some mindsets I've found that really support this are:

### 1. Test the "What" and Not the "How"

This means writing tests that read, "in this particular scenario, this input should result in this output" rather than "in this particular scenario, some particular function or method should be called". The more tightly coupled your tests become with the application code, the less natural it becomes to read and it also harms the test suite's ability to be a safe guard when refactoring.

### 2. Clever Tests Are Not Better Tests

It's tempting to write control structures and various helpers into tests to make them easier to write, but 9 times out of 10, I recommend against it. This is because the "naive" way of writing a test is generally easiest to understand whenever anybody revisits the test.

In other words, write the tests as dead simple as possible. Hardcode expectations instead of generating them. Repeating an operation with slight variations multiple times? Hardcode them, don't use a loop.

### 3. Localize Tests As Much As Possible

By "localize," I mean keep all crucial context within the test as much as possible. If a different part of the file needs to be looked at to fully understand a test, that's a hindrance. If an entirely different file needs to be loaded to fully understand a test, that's _definitely_ a hindrance.

The goal of localizing test context is to reduce the time from "open test file" to "understand test file" as much as possible. While DRY principles are important in the application code, they can become harmful in the test suite.


## Closing Thoughts

Well-written and easy-to-understand tests are just as crucial to an application as the application code itself. It enables not just your team, but also you to better iterate on your project.

Code reviews are a great place to help evolve this sort of mindset in your team.
