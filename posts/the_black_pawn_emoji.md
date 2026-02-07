---
title: The black pawn is both emoji and unicode
date: "2026-01-11"
tags: ["javascript", "rant"]
---

This past week, I've been working with [Ink](https://github.com/vadimdemedes/ink) to create a TUI chess [viewer](https://github.com/chess10kp/chesh), to catch up on chess events without having to use a browser. It's also on npm: `npm i chesh`. 

One of the requirements of this application is a representation of a chessboard. This can be done in many ways, a few of which are outlined below:

### Plaintext
```
+-------------------+
| P | K | B | Q | K | 
| p | k | b | q | k | 
+-------------------+
```
The simplest solution, but this doesn't look great on a terminal 

### ASCII
```
                   ✚     Ψ
 ▟▙  ▞█▙    ▙█▟ 	███	  ███
 ██	  ██    ███ 	███   ███
                  
```

This looks a little better, but clearly takes up a lot more space

### Unicode

```
♚ ♛ ♜ ♝ ♞ ♙
```

Unicode is a comfortable middle ground, so clearly that is the one that I should be using. In the example above, the pawn is the only character that isn't filled in. Why?

The Emoji consortium decided to create an emoji to "represent chess" in 2024, and proposed and implemented the pawn (♟) as its new emoji. The problem is that they chose to map the chess emoji to the same unicode as the existing unicode pawn symbol, and I don't really know why.

The problem arises because terminals are smart enough to realize that the pawn could be swapped out with its emoji representation, but they don't realize this breaks user applications. Since the emoji version is double-width, this makes the pawn doubly wide as the rest of the pieces. 

Even when explicitly passing in U+265F as a string, terminals still choose to override it with the emoji version instead. How do you force the unicode preference on the terminal?

### Enter Variation Selectors

Variation Selectors can be used to tell the rendering engine how to display the preceeding character 

- VS15 for text 
- VS16 for emoji 


To force the Unicode pawn (♟) on a terminal, you can use the VS after the unicode.

```javascript
const BLACK_PAWN = "\u265F\uFE0E"; 
console.log(`${BLACK_PAWN}`); 
```

## Conclusion

While it sucks that the unicode consortium didn't allocate a different part of the private region for the pawn emoji, next time your chessboard TUI breaks formating, you know what's going on.
