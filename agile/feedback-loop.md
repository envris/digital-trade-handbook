---
title: The feedback loop
order: 1
---

The feedback loop is everything you do between:

* identifying a problem or hypothesis to test
* designing and delivering a solution, and
* measuring how well the change you made met the user need

To work effectively in an agile team, you need to understand your product's feedback loop, the factors that impact its length, and the actions you can take to reduce the size of the loop.

[[toc]]


# Learning about the problem from the journey

When you take a waterfall approach to delivering a project, you set out all your requirements at the start, at the point when you often know the least about the problem.

In contrast, taking an agile approach means you lock in as little as possible upfront and use what you learn along the way to shape your path.

Even designing and testing the smallest of ideas with users will offer valuable insights that will help you refine and recalibrate. Doing this over multiple years results in a product that's battle-tested with real users.

This requires a different approach to delivery: in mindset, planning and technology. It's all about planning for your plans to change.


# Shorter feedback loops reduce risk

A longer feedback loop means it takes longer to deliver a given change to the product, and longer to fix any problems that arise when the change has been released to users.

Over time, this means you're more likely to bundle up more changes to release at once. In turn, this increases the risk that a product release will have an unintended consequence.

This becomes a vicious cycle, where releases become bigger and riskier and we respond with increasing change controls and process.

We'd like to flip this. By reducing our feedback loops, changes become smaller, regular, more predictable and well-rehearsed. Change becomes our 'business as usual', and when something goes wrong, we're able to detect it and fix it quickly.


# Feedback loops start with technology

Technology is the first limiting factor in the feedback loop. You can't run faster than the speed that you can release new versions of your product.

Good starting points for faster software releases include:

* choosing technology that allows for zero-downtime deployments
* using pipelines to make your release process repeatable
* writing automated tests to check for unexpected regressions
* setting up monitoring to be alerted when something breaks

Sometimes, you'll be faced with making a large technology change to your product that could block other changes from being released.

In this situation, common approaches to breaking down the change into smaller pieces include:

* using [feature toggles](https://martinfowler.com/bliki/FeatureToggle.html) to switch code on or off on demand
* decoupling large database changes from the software release
* dual-running old and new processes instead of 'big bang' switchovers


# Bring your users along with you

Another common challenge is the speed at which your users - whether inside or outside the department - can adapt to your product's changes.

This might be due to the need to change working practices, to make sure users are aware of the changes, or to give partners enough time to update their own systems and processes.

There is no one-size-fits-all approach, but early planning to help your users more easily adapt to changes in your product will give you more flexibility in the future.



