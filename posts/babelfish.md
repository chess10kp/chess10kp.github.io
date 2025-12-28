---
title: BabelFish
date: "2025-11-24"
tags: ["typescript", "project", "langchain"]
tagline: AI in your chats is awful, but what if it was YOUR AI in YOUR chats
---

BabelFetch was my team's project at [HackDearborn](https://hackdearbon.org) this year. [Demo Video](https://youtu.be/1sCfoWvphjw) (Recorded after 30 hours being awake, I promise I don't usually sound like this).  

The initial inspiration for the idea came from being able to participate in discussions in communities that speak different languages, either by passing messages through Gemini or just swapping it out for Google Translate's API.  But it soon moved into thinking about

BabelFish (yes, *that* [Babelfish](https://hitchhikers.fandom.com/wiki/Babel_Fish)) is a browser extension that lets you inject AI into your chats to summarize and translate long conversations instantly. So you don't have to deal with this, ever. 

![Discord notifications pings](/pings.png)

What makes BabelFish especially powerful is fact that it works client side. This means no one else in the discussion knows you use AI assistance to keep up with the conversation (which sounds bad now that I say it out loud). The other alternative to this would be to add a server side bot that users can query that monitors messages and gathers every message sent, but this takes away from what I think is BabelFish's greatest strength, user customization.  

When I say customization, I'm thinking self hosting your own backend for BabelFish, and firing events you are pinged, for instance. Or if a coworker needs something from you, BabelFetch could automatically add that to your Google Tasks list. This also opens the door for more advanced features, like automatically responding to messages on Slack by having it query your knowledge base.


## Future improvements

Currently, we don't parse image or gif information to keep inference costs cheap (and ideally within Gemini's free limit), but given enough financial impetus, it isn't difficult to swap that out for a more powerful model capable of multimodal input. 

Building up a knowledge base, similar to how [Claude](https://claude.ai) or [ChatGPT](https://chat.openai.com) have "memories", storing important conversations in a summarized format is incredibly powerful. This lets you search for ideas and conversations, instead of having to comb through hundreds of messages sharing the same keyword. Regular search is just not smart enough. 


I think the flexibility with the core product is endless, and really, I can't wait to see how it can be used to bridge communication gaps and cut the time spent on discussions. Check out our [Devpost](https://devpost.com/software/babelfetch).
