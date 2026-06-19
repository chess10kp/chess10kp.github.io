---
title: Functional Programming in Jac, Part 1 - Functions
date: "2026-04-24"
tags: ["jac", "functional-programming"]
tagline: Does a graph based programming model map well to Functional Programming?
---

This post is a follow up to [Functional Programming with C#](/blog/functional_programming_with_cs), I wrote a year ago. My recent programming language infatuation has been [Jaceci Labs's](https://jaseci.org) Jac language. 

Since Jac is relatively new (having started development only in 2021), the Jaseci team benefits from all the research around language ergonomics over the last 30 years, so I expected them to use an existing paradigm and reuse the design principles from other langauges. 

The Jac team, however, decided to implement their own paradigm, Object Spatial programming (OSP). OSP defines computation as a series of nodes and walkers, and so all Jac programs follow a graph driven model. 
Pretty much everything in Jac can be represented as nodes and graph traversals (called "walkers"), and this novelty nerd sniped me. So cool!

Guess what other language paradigm is also great at representing computation as traversals? Functional programming! This led me to believe that Jac syntax favored a functional style. Jac's syntax closely resembles Python, but I'm not going to let that stop me.

So in effect, this post is a little view into how well Jac's OSP translates to Functional Programming concepts. 

## A little setup

Jac supports `def` just fine, which closely resembles Python functions, and I could most definitely use these. But for reasons that will become clear later, I think it makes more sense to define functions as Jac's `nodes` and represent function calls as `walker` traversals when exploring a functional style. 

```jac
node Function {
    has x: any;
    has fn: object; # your function object
}
```

This definition makes our lives much easier, so lets assume that this is the same definition we are using for the rest of the post.

## Functional purity

Functional purity is *the* fundamental property of functional programming. So it makes sense to start here. Pure functions in Jac might look like this:

```jac
walker Apply {
    has x: any; 

    can start with Root entry {
        visit [-->]; # visit the first connected function 
    }

    can start with Function entry {
        self.value = here.fn(self.x); 
    }

    can done with Root exit {
        report self.value # at the end, exit!
    }
}
```

That was easy! To "call" this function, we just attach a function object to the root node, and traverse the root! That might look like this:

```jac
with entry {
    root :+> Function(fn=lambda x: x * 2) 

    arg: int = 20;
    result = root spawn Apply(value=arg); # returns 40
}
```

## Function and Function Composition

And now for the walker:
```jac
can start with Function entry {
    # grab the function from the current Function node
    arg: any = self.x
    # and apply it to the parameter
    self.value = here.fn(arg); 
    visit [-->]; 
}
```

You can now compose functions like this: 
```jac
with entry {
        root :+> Function(fn=lambda x: str : int(x)) 
             :+> Function(fn=lambda x: int : x * 2) 
             :+> Function(fn=lambda x: int : f"Result: {x}");
}
```

and call them the same way as before

```jac
result = root spawm Apply(value="20")
```

## Partial Application

Partial Application is the ability for a function that takes two arguments, to take a single argument and return another function that takes in the second argument. Its functionception!

With our previous definition, partial application is essentially free! Since elements are of type `any`, we can pass any value to `Function`, including other functions.

```jac
with entry {
       root :+> Function(fn=lambda x: str : int(x))
            :+> Function(fn=lambda x: int : x * 2)
            :+> Function(fn=lambda x: int : f"Result: {x}");

    result = root spawn Compose(value=lambda x: int : x * 2);
}
```

Here, result is now a `lambda` type, and used in a `Function` node of its own.
I mean I guess that's fine, but it looks kinda ugly (inline lambdas give me the ick).

I think `Function` needs an upgrade. The simplest way I can think of would be to wrap the value in a Monad, letting walkers unwrap the value only when reporting it's value at the end. The other way would be to 
