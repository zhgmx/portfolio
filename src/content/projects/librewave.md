---
title: LibreWave
source: https://github.com/zhgmx/LibreWave
summary: A Linux-native Wave Link alternative for Elgato hardware, built in Rust.
tech: Rust
order: 4
---

LibreWave is the rewrite of Undertone, my attempt at building a Linux-native alternative to Wave Link for Elgato's Wave hardware.

The original Undertone work is still on the [undertone branch](https://github.com/zhgmx/LibreWave/tree/undertone), while the rewrite is on [main](https://github.com/zhgmx/LibreWave/tree/main).

Undertone started as an experiment in what Claude Opus 4.5 could do with Rust. It got pretty far, but it never became something I could actually use. The code quality was not good enough, and I eventually stopped investing time in it. However, I still wanted a way to get Wave products working cleanly on Linux, so I'm bringing it back as LibreWave with a full rewrite that targets the hardware itself.

A lot of the early work has been figuring out how Wave Link talks to the hardware. I used the macOS app and its bundled frameworks as the main source, then compared what I found with the Windows builds. Newer models like GPT-5.6 Sol helped a lot here, and this would have taken an absurdly long time without them. A lot of the protocol work is done now, and you can find it being implemented in the repository.

I'm still using LibreWave as my go-to project for experimenting with agentic engineering, though I'm much more involved now instead of letting the agent do whatever it wants to. The end goal is for it to become something I actually use in my daily workflow.
