---
title: Making things for the sake of it
date: "2025-08-24"
tags: ["csharp", "programming-language", "compiler"]
tagline: why you should make stuff for fun
---

In 2024, I hit the point in my life where I wanted to make my own programming language. The world didn't need another "JS-like programming language with  human readable syntax", but I decided what the world needed didn't matter. I named it [Snip](https://github.com/snip-lang/snip), because the goal was to *snip* compilation times down to 0 by just interpreting everything instead.

I started off, as many do, with the [Dragon Book](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools). In retrospect, I should've jumped into implementing my language sooner, reaching out for the book only when I didn't quite understand what to do next. I learnt a lot faster through iterating through failed attempts than I ever did reading through pages of text.  

Programming languages have a lot of moving components; Early Snip development taught me making even a toy language is difficult. The challenge comes in the form of tedious, repetitive patterns unavoidable when making a compiler. Adding a new keyword means updating the lexer which breaking parsing; modifying the evaluator to add more library functions needed changes to both the parser and lexer. Compilers are tightly composed of multiple modules, but this coupling meant any changes introduced in one module had unexpected bugs in another. The keyword table is a great example of this complexity

```csharp
{ "try", TokenType.Try },
{ "catch", TokenType.Catch },
// (100 more lines)
{ "protected", TokenType.Protected },
```

I reached a breaking point when I was adding in array literals. What I thought was a simple feature took me days to implement. Regressions kept popping up, and I realized all the interactions were too much to keep in my head. 

That's when I realized an interpreter was the perfect Test Driven Development (TDD) project because each feature was observable and verifiable. If I was to keep language development sustainable, I needed tests to catch regressions automatically.

### TDD
 When I started writing integration tests, the first surprise was the complexity involved with language testing. 
- Representing ASTs was verbose, so I wrote utility functions to turn strings into ASTs
- The evaluator produced nested values that needed to be compared structurally
- I had to verify that error cases failing for the right purposes

Even with the setup cost, the benefits were immediate. Adding new features was faster, and the tight feedback loops from the testing suite made it addictive to work on. Array literals, which previously took me an entire weekend to implement, was an hour's worth of programming, because any time anything broke, the tests pointed at the failing behavior.   

```csharp
[Test]
public void ArrayLiteral_ShouldEvaluateContents() {
    var result = Evaluate("[1, 2 + object.name]"); <- that breaks
    Assert.AreEqual(new List<object> { 1, 4 }, result);
}
```

TDD didn't just speed up development, it helped me worry less and think faster when implementing new things. 

Snip is now an interpreted dynamic language written in C#. One of its quirks being that `array` and `object` live in the standard library since I naively assumed that would make execution times faster for `Hello World!`. It also has a [large standard library](https://github.com/snip-lang/snip/blob/main/README.md) inspired by Go and Haskell. 

Here's `Two Sum` solved in Snip

![TwoSum](/snip.png)

The biggest surprise wasn't the language itself, it was how much TDD shaped the language design. Tests made development more robust by:
- forcing me to define semantics for each feature
- making language spec changes fast
- revealing design flaws when I couldn't test it cleanly

A programming language is absolutely perfect to realize the effectiveness of comprehensive testing, showing me the elegance of TDD when a system has multiple moving parts.

Snip didn't need to exist. I built it because making things help me learn an unreasonable amount rapidly. In my case, I ended up discovering how elegant TDD can be and learning C# deeply. It turns out making things for the sake of it is its own justification.
