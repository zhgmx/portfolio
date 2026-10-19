---
title: LibreWave
source: https://github.com/zhgmx/LibreWave
summary: Linux-native audio control and mixing software for Elgato Wave hardware.
tech: Rust, Linux
order: 1
---

![LibreWave audio control interface for Elgato Wave:3](/projects/librewave.webp)

LibreWave is my attempt at building a Linux-native alternative to Wave Link for Elgato's Wave hardware, starting with the Wave:3. After making the switch to Linux as my daily operating system, I noticed many functionality gaps with the Elgato hardware support on Linux.

For instance, I had to add a custom Wireplumber script just to allow the microphone to properly capture audio. [This repository](https://github.com/jmansar/wavexlr-on-linux-cfg) has a better technical write-up on it.

A lot of the project has been reversing how Wave Link talks to the hardware. I've been using AI to help work through the macOS app and its bundled frameworks, compare them with the Windows builds, and turn the findings into a USB protocol implementation.

It's written in Rust, with a background daemon that manages the hardware, mixer, and saved profiles. The CLI and native GPUI interface both talk to that daemon over a local Unix socket.

On the audio side, ALSA handles the physical microphone and headphone playback, while PipeWire connects the mixer to desktop applications. Software inputs feed separate monitor and stream mixes, with independent levels for each, so I can change what I hear without changing what gets sent to a stream. The mixer runs at 48 kHz and keeps allocations and blocking work out of the audio callback.

It's still a work in progress, and I'm working through recovery and longer hardware tests before I'd call it ready for everyday use. It's also become my go-to project for experimenting with AI-assisted development and reverse engineering, with the goal of getting it into my own daily setup.
