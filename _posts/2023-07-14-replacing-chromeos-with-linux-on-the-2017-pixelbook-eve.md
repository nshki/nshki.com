---
title: "Replacing ChromeOS with Linux on the 2017 Pixelbook (Eve)"
description: A step-by-step guide for installing Linux on the Pixelbook and replacing ChromeOS.
date: 2023-07-14 20:37:00 -0700
image: https://nshki.com/assets/posts/replacing-chromeos-with-linux-on-the-2017-pixelbook-eve/pixelbook.jpg
---

I admit, I absolutely nerd sniped myself this week when I told myself I wanted to install Linux on my 2017 Pixelbook (Eve). This particular Pixelbook is, to this day, one of my favorite pieces of computer hardware. It's incredibly thin and I love how unique it is with its sleek white slate on the back.

![My Pixelbook](/assets/posts/replacing-chromeos-with-linux-on-the-2017-pixelbook-eve/pixelbook.jpg)

Unfortunately, Google drew the Pixelbook on its Auto Update Expiration (AUE) list a while back, saying that after June 2024, the device will no longer receive OS updates. It's such a bummer since it still performs well with a lighter OS like ChromeOS, and I honestly could see myself still using the machine as my daily driver if the M2 MacBook Air didn't come around.

So naturally, I wanted to put Linux on it.

Not just use Linux through ChromeOS or Crostini, but completely replace ChromeOS with it. Chromebooks are generally known to be fairly closed devices since you can't boot from USB drives out of the box. No one thinks of a Chromebook when they're looking for their next Linux machine. Luckily, there are folks out there that have figured it out. Here are the steps that I followed for removing ChromeOS and installing Linux on the Pixelbook.

## 1. Enable developer mode on the device

First things first, we have to enable developer mode on the Chromebook to access things like Crosh (Chrome shell) which let us modify the system firmware.

1. Turn the Chromebook off.
2. Hold `Esc` + `Refresh` as you turn it back on.
3. Wait for a scary prompt that says ChromeOS is missing or damaged. Press `Ctrl` + `D` on this screen.
4. Follow steps to reboot the device. The rest of the steps is a standard ChromeOS installation process, so go through that as well.

## 2. Enable booting from USB

I stumbled upon [mrchromebox.tech](https://mrchromebox.tech/), which is run by someone called MrChromebox. After glancing at the updates on the site, I saw that there have been active posts since 2016 and the latest release was in May of this year. An active project was a very good sign. (The website has a ton of information that gets into the internals of Chromebooks, so check it out if you're so compelled.)

I then checked the [supported devices page](https://mrchromebox.tech/#devices) to see if the Pixelbook (2017, Eve) was listed, and to my delight, it was. After digging around various Linux-on-Chromebook articles, it seemed like modifying the device firmware was important to allow booting from a USB drive, so I clicked into the [firmware utility script page](https://mrchromebox.tech/#fwscript) where he outlines some commands that pull [Bash scripts which are mirrored on GitHub](https://github.com/MrChromebox/scripts).

From here, I cracked open a Crosh shell. Here's how to do that:

1. `Ctrl` + `Alt` + `T` to open a Crosh window.
2. Execute `shell` to jump into a proper shell from there.

I then executed the firmware utility script:

```bash
cd; curl -LO mrchromebox.tech/firmware-util.sh && sudo bash firmware-util.sh
```

Luckily this script provides some nice step-by-steps in the CLI. I picked `1) Install/Update RW_LEGACY Firmware` and picked further options that enabled boot-from-USB as the default device behavior.

## 3. Plug in the Linux USB drive

Presumably you have a USB drive with your preferred flavor of Linux on it already. If not, go do that. I ended up grabbing a copy of [Elementary OS](https://elementary.io/) for this project and put it on an ancient 8 GB USB drive. Plug it into the Chromebook.

Now, reboot the device. You should see a scary screen that warns you about the device being in developer mode. Ignore it and press `Ctrl` + `L` to allow the device to boot from the USB drive. Wait until the device is able to successfully boot from the drive, but the rest of the way should be a standard Linux installation process!

_The screen will be upside down on the Pixelbook, so flip your device around to get the orientation right or just use your finger to tap through the flow on the touchscreen._

## 4. Fix screen orientation and brightness (Pixelbook and Ubuntu-specific)

_This step can be ignored if you're not on a Pixelbook and not using an Ubuntu-based distribution._

There is some further tweakage needed to fix the screen orientation and enable screen brightness adjustments on the Pixelbook on an Ubuntu-based distro. You've probably already noticed everything being upside down, but that can be fixed by navigating to the OS display settings and adjusting rotation config there.

To be able to adjust screen brightness (since by default it has everything at 100%), open terminal, and using your editor of choice, `sudo` edit the `/etc/default/grub` file. You'll need to make sure that the `GRUB_CMDLINE_LINUX` variable is set to the following:

```bash
GRUB_CMDLINE_LINUX="i915.enable_dpcd_backlight=1"
```

You can then apply these changes by running `sudo update-grub` and giving your device a restart. Make sure to always press `Ctrl` + `L` when seeing the scary developer mode screen again. You'll need to do this each time you reboot.

## Live, laugh, love

And voila! The end-of-life'd Chromebook is now a healthy Linux machine with no end of life in sight. I always get excited when working with outdated tech because there's so much more that can be done with them than corporations lead us to believe. Installing Linux on these devices gives them so many more years of usage and saves a good deal of money. If you made it to the end of this article, then I commend you for making the choice of Linux-ifying your Chromebook.

I'm also happy to chat further with you over [email](mailto:hello@nshki.com) or the [fediverse](https://ruby.social/@nshki).
