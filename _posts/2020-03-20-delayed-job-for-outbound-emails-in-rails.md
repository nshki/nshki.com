---
layout: post
title: Delayed::Job for outbound emails in Rails
date: 2020-03-20
description: A situational but noteworthy use case of Delayed::Job for outbound emails in Ruby on Rails.
---

Let's say you run an online e-commerce platform. You want to send out a reminder email to new merchants to fill out their business profile because shoppers care about who they're buying from. In Rails, that's pretty straightforward:

```ruby
MerchantMailer.profile_reminder(merchant.id).deliver_later \
  wait_until: 3.hours.from_now
```

But wait, we should make sure that the merchant doesn't already have their profile filled out when the reminder email is about to go out. Otherwise we'd be sending an annoying and not applicable email.

```ruby
class MerchantMailer < ActionMailer::Base
  # Reminder to fill out business profile.
  #
  # @param {Integer} merchant_id - Merchant record ID
  # @return {ActionMailer::MessageDelivery} - Email to deliver
  def profile_reminder(merchant_id)
    return unless (merchant = Merchant.find_by(id: merchant_id))

    return if merchant.filled_out_business_profile?

    # ...
  end
end
```

Perfect! Or is it? This test fails:

```ruby
RSpec.describe MerchantMailer do
  describe '#profile_reminder' do
    it "shouldn't run the method code until send time" do
      expect(Merchant).to_not receive(:find_by)

      MerchantMailer.profile_reminder(1).deliver_later \
        wait_until: 3.hours.from_now
    end
  end
end
```

Unfortunately this doesn't work because _mailer methods are run at the time we queue the job, not at the time of job processing_. Our reminder emails will still always get sent even if our merchants filled out their profiles.


## Enter Delayed::Job

[Delayed::Job](https://github.com/collectiveidea/delayed_job/) is an excellent (and popular) gem that provides a bunch of tools for processing jobs. `#delay` is a method added to all objects by Delayed::Job that we can use here.

Instead of queueing up the reminder email, we can queue up a method that determines if the email should be sent. So in our controller or service object, we can add:

```ruby
# Queues a reminder to fill out the given merchant's business
# profile if they haven't already.
#
# @param {Integer} merchant_id - Merchant record ID
# @return {void}
def send_profile_reminder(merchant_id)
  return unless (merchant = Merchant.find_by(id: merchant_id))

  return if merchant.filled_out_business_profile?

  MerchantMailer.profile_reminder(merchant).deliver_later
end
```

And replace our original line where we queued the mailer with:

```ruby
delay(run_at: 3.hours.from_now).send_profile_reminder(merchant.id)
```

Now what's queued isn't the email itself, but `send_profile_reminder`, which will determine if an email should get queued at the time it's scheduled for.


## Closing Thoughts

This is a very situational use of Delayed::Job. I used e-commerce just as an example, but this could apply to anything that warrants conditionals at the time of a queued job. Perhaps you want to email trial users about something, or maybe you want to check in with a patient about a medical condition. Whatever the use case, using `#delay` in this manner is something that can help prevent an otherwise disgruntling bug.
