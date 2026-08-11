---
title: Duels+
url: https://duelsplus.com/
summary: A lightweight Minecraft proxy designed to enhance the Hypixel Duels experience.
tech: TypeScript
order: 3
---

![Duels+](/projects/duelsplus.webp)

A lightweight Minecraft proxy designed to enhance the Hypixel Duels experience. I worked on the proxy itself, not the website (which is what you see above).

The core is a TypeScript proxy that sits between the client and Hypixel. Under the hood, it uses the [minecraft-protocol](https://github.com/PrismarineJS/minecraft-protocol) package. Some of the features include session tracking with configurable goals, stat tags on nametags, GUI-driven settings, a command system with tab autocomplete, and a plugin API that lets external developers build features on top of the proxy.

You can read more in the [devlogs](https://duelsplus.com/devlog).
