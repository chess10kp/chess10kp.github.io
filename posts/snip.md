---
title: Making things for the sake of it
date: "2025-08-24"
tags: ["csharp", "programming-language", "compiler"]
tagline: why you should make stuff for fun
---

In 2023, I hit the rite of passage for every developer - the urge to create your own programming language. The only question is what kind of language I'd make, not whether the world needed another "dynamically typed, JS-like programming language". 

I named it [Snip](https://github.com/snip-lang/snip), because the goal was to *snip* compilation times down to 0 by just interpreting everything instead. It's kinda stupid but I thought it was hilarious when I first came up with it. I love it anyway.

Very early into the development process, I learnt creating your own programming language is a **lot** of work. The main challenge is just how *tedious* the whole process is. Compilers have a lot of moving parts: the lexer, parser, and codegen, so making any change ripples updates throughout the codebase.

The keyword table is a great example of this complexity

```csharp
{ "try", TokenType.Try },
{ "catch", TokenType.Catch },
// (literally 100 more lines :/ )
{ "protected", TokenType.Protected },
```

To add an additional keyword, I had to update:

- the lexer
- the parser
- the type checker
- the evaluator

on top of programming the keyword's functionality into the compiler. 

I reached a breaking point when I was adding in array literals. What I thought was a simple feature took me days to implement. Regressions kept popping up, and I realized all the interactions were too much to keep in my head. 

How on earth did compiler devs keep track of their 100k LoC codebases? 

Writing good tests, that's how. I'd neglected testing my code since I was confident that I knew how everything worked, and my hubris prevented me from seeing that even my code had bugs sometimes. 

Once I'd spent time combing the codebase and testing out each piece of code well, I felt the features immediately. Adding new features was faster, and the tight feedback loops from the testing suite made it addictive to work on. 

Array literals, which previously took me an entire weekend to implement, was an hour's worth of programming, because any time anything broke, the tests pointed at the failing behavior.   

Snip is now an interpreted dynamic language written in C#. One of its quirks being that `array` and `object` live in the standard library since I naively assumed that would make execution times faster for `Hello World!`. It also has a [large standard library](https://github.com/snip-lang/snip/blob/main/README.md) inspired by Go and Haskell. 

Here's `Two Sum` solved in Snip

![TwoSum](/snip.png)

Ok, so did I make a post just to show off a programming language I created? Partially, yes (and I'm very impressed you made it this far ). 

The more important takeaway for me was that making things just because you want, always teaches you something. In my case, I ended up discovering how elegant Test Driven Development can be *and* helped me learn C# deeply. 

Oh, Is that not convincing enough? Linus Torvalds created Linux for fun too (he just like me fr). He probably learnt something along the way. Just go make something. You'll thank me later.
