---
title: How I improved my chess elo by 300 points (2350 -> 2650)
date: "2025-09-24"
tags: ["chess", "project", "extension"]
tagline: Not clickbait
---

Playing bullet chess (1 minute per side for the whole game) is sometimes a gamble. One loss turns into two, then five and suddenly I'm down 5 games. Here's an example

![Streak](/losing_streak.png)

I lose 30 points in a matter of minutes, because I don't realize I'm tilting. 

I needed something to force me to stop, because I never noticed before it was too late. So I made ChessBreak, a Chrome extension that detects before you tilt and cuts you off before you tank your rating and your morale. Here's what it does:

*   Keeps track of your wins, losses and draws in a single session.
*   Notices when you're on a losing streak and blocks you from starting new games for a cooldown period
*   A losing streak is defined as either consecutive losses or a large drop in rating 

That's it. The idea is just to force you to take a breath, and maybe step away for a bit. ChessBreak doesn't stop you from playing, it only stops you from playing *badly*

Why this might work for you:  

- It begins tracking your games on chess.com with no setup
- A little popup tells you how good (or bad) you're doing 
- It stops you from self destructing and losing games when you're out of form

To install it:

1.  Download the [extension](https://inkscribe-org/chessbreak)
2.  Go to `chrome://extensions` and turn on "Developer mode"
3.  `Load unpacked` and point it to the folder
4.  Go play chess on chess.com

You can also build from source for Firefox since it uses the cross platform [CRXJS](https://crxjs.dev/) framework.

How it works under the hood is also simple: it watches when games start and end and records whether you won or lost. If you lose three in a row, it removes the buttons from the DOM for five minutes. After five minutes, it resets the stats.

When you click the extension icon, you'll see your record, your current losing streak, and whether it's currently blocking you. If it is, take a break!

If you lose 3 in a row, the new game buttons go away, and a timer starts counting down. Go get grind some puzzles or something.

## Results

The results were surprisingly effective. I hit my peak (2672) in a week of using the extension: 

![streak](/gain_rating.png)

This is about 100 points over my previous peak I reached last year, and about 300 points of my average rating over this year (2350 -> 2670).

## Future Improvements

I'm thinking about adding a few more things later on, like letting you change how many losses trigger the block, or making it work on Lichess too. And maybe some fancier stats. If you like this extension and you play in Lichess, [let me know](mailto:nmadhu@umich.edu) and I'd be glad to add multi platform support.

