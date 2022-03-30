---
title: Testing is for all of us
date: 2019-04-20
description: My thoughts on why I think automated testing is a crucial part of any software team.
---

If you're a software engineer, regardless of if you studied CS in college, learned programming through the Internet, or went through a bootcamp, you've heard it time and time again.

Testing is important.

But why? It's easy to hear those words over and over, but not quite grasp the significance of them without being in the real world. This is my take on why I think testing, and more specifically automated testing, is so important.


### Quality Assurance (QA)

Quality assurance is a multi-faceted discipline whose primary objective is to ensure that product(s) are meeting high standards. In software, some of the large buckets of QA are:

- **Functional QA**: Does everything work properly?
- **Design QA**: Does everything look right?
- **Stress Testing**: Does it still run with high traffic?
- **Security**: Is it difficult to compromise?

Automation can help in every one of these facets. Integration tests can be put in place to catch regressions, CI platforms can be configured to output screenshots in different screen sizes, and scripts can greatly increase the server load and/or look for common security exploits in an application.


### Time and Confidence

In interest of time, there may be situations in which teams don't prioritize automated testing in order to get features out the door. This inevitably puts a lot of pressure on the team performing manual QA. If this trend continues over time, the company may prioritize hiring more and more manual QA staff, at which point it becomes more and more difficult to achieve satisfactory automated test coverage.

The problem here is that there is a compounding opportunity cost.

As a real-world example, the QA team that I work with can perform a full, manual regression checklist for an application in a full day. That checklist covers things like UI interactions, SMS and email notifications being sent out, etc. That same checklist, after it was all automated, _takes less than 5 minutes_.

Prior to automation, the QA team performed a full regression check before every release. Any defects were caught, logged, and assigned back to the engineering team. After automation, with continuous integration (CI) and continuous deployment (CD), any time the engineering team pushes code and something breaks, the team is notified and a deployment does not occur.

A well-maintained automated test suite enables the team to find bugs faster, gives back an incredible amount of time to help them focus on things they couldn't have before, and increases the confidence of the entire team. No matter how incredible someone is at manual QA, at the end of the day, they are human, and humans can miss things. Machines can be more consistent at finding defects.


### A Function of Engineering

I think that it's crucial to have engineering teams write automated tests for the features they develop. They have the context necessary to fully automate test cases since they are in the code on a day-to-day basis. Things like unit tests and API tests would be incredibly difficult for an external team to write.

Furthermore, regardless of whether a team follows test-driven development or not, automated tests will help engineers catch defects in their code before it's released into the wild, and perhaps just as importantly, enables refactoring in confidence.

This leads me to believe that QA should be a function of engineering. At the end of the day, QA engineers are exactly that, _engineers_. Automated test suites need maintenance, just like any other piece of software. QA engineers are necessary to ensure the suite is well-oiled by optimizing reliability (fixing flaky tests), improving runtimes, and refactoring.


### What About Manual QA?

Automated testing does not rule out manual QA by any means. It massively complements it. Because of the time it gives back to the team, QA staff can focus more on things like design QA* and discovering bugs through new edge cases rather than having users find them in the wild (and angrily reporting them).

*Some teams prefer to have their design teams perform design QA, and that makes perfect sense.


### Closing Thoughts

Automated testing should absolutely be a priority in a software team. Increase developer productivity, save incredible amounts of time for QA staff, and instill confidence in the entire team that the software works and looks correctly, every time.
