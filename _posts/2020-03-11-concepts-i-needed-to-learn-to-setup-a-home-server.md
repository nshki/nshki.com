---
layout: post
title: Concepts I needed to learn to setup a home server
date: 2020-03-11
permalink: /concepts-i-needed-to-learn-to-setup-a-home-server/
description: (As a networking newbie.)
---

I've always wanted to set up a home server, but my networking knowledge has always held me back. I've always been _aware_ of things like DHCP and port forwarding but have never configured anything meaningful with them, so they remained somewhat of a mystery to me.

My goal here is pretty straightforward: configure a machine in my home so I can SSH into it over the Internet. I finally hunkered down and learned enough to accomplish this and was pleased to find this is actually very easy to do.

Here are the concepts that helped me get there.


## LAN, WAN, and static IP addresses

LAN stands for local area network, and it's the network of devices connected to my home router. WAN stands for wide area network, and it's the network of households being serviced by my Internet service provider.

When I connect my server box to my home network, my router assigns it an IP address that looks something like 198.168.1.12. When that server box reconnects to the router from a restart or some kind of connectivity issue, the router assigns it an IP address that isn't necessarily the one it assigned earlier. This is called a dynamic IP address. DHCP (dynamic host configuration protocol) is what handles this process, but it's not crucial to really know anything more about it for setting up a basic home server.

A static IP address is, surprise surprise, one that the router will _always_ assign a particular device whenever it connects to the network.

All I had to do to setup a static IP address for my machine was use my router's software. This is different on a router-by-router basis, but it was very straightforward in my case. Get into my router's admin screens, find a menu option for IP addresses, find the relevant device, and assign it a static IP.


## Port forwarding

This was more or less the gate keeper concept for me previously in setting up a home server. What the heck _is_ port forwarding?

When SSHing into my device, I'm essentially doing two things:

1. Pinging the IP address of my home network (this is my public IP via my WAN).
2. Pinging the static IP address of my device (via my LAN) with a specific port number (in the case of SSH, it's 22).

For step 2 to be successful, I have to configure my router to know which local IP address to "forward" the request to when an SSH login is attempted. Also, for security reasons, I don't want to just forward port 22 from my public IP to my device IP since bad peeps might want to spam SSH login attempts if they get ahold of my public IP.

This is, at its essence, what port forwarding does. It is a configuration at the router level that will forward requests from a public IP + port combination to a local IP + port combination.

Again, the setup for this was pretty straightforward. I jumped back into my router's admin screens, found a menu option for port forwarding, picked an obscure port number and pointed it to my device's static IP address at port 22.


## SSH software

Finally, the last piece here was to setup software on my device to properly accept SSH login requests at port 22. This will vary depending on which OS is being used, but in my case, I was using Ubuntu Linux, so I installed the `openssh-server` package with:

```bash
$ sudo apt update && sudo apt install openssh-server
```

And now this computer was ready to allow username/password combinations for existing users for SSH logins. Allowing connections with SSH keys and disabling passwords is something that can be configured with most SSH packages as well.


## ..magic!

That was...it! Now I'm able to bring around an iPad and write blog posts and code, which gives me a mild sorcerer complex, and it's wonderful. For extra kicks, you can add an A record with your DNS provider to point mahbox.mahdomain.com to your public IP.
