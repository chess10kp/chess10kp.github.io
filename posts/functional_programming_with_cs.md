---
title: Functional Programming with C#
date: "2025-05-19"
tags: ["csharp", "functional-programming"]
---

# Introduction

This post is an attempt at writing C# as if it were a functional language. Yes, I know F# exists, but the point is to keep using an OOP language where it is useful, while using a functional approach to make transformations more expressive.

# What is Functional Programming?

Wikipedia has this as it's definition of functional programming:
> In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing functions.

Simply put, functional programming is a programming paradigm that treats computation as combinations of functions, instead of using objects and state.

Consider this example of a depth first search on a graph using an OOP approach:
```csharp
public class Node
{
    public int Value;
    public List<Node> Neighbors = new();

    public Node(int value) => Value = value;
}

public class DFS
{
    public void Traverse(Node node, HashSet<Node> visited) {
        if (visited.Contains(node)) return;
        visited.Add(node);
        foreach (var neighbor in node.Neighbors)
            Traverse(neighbor, visited);
    }
}
```
Notice how in the `Traverse` method, we mutate the `visited` set at each step. Mutable state, leading to side effects are a common pattern in OOP.    
<br>
The equivalent functional programming approach might look like this:
```csharp
public static class FunctionalDFS
{
    public static IEnumerable<int> Traverse(Node node) =>
        Traverse(node, new HashSet<Node>());

    private static IEnumerable<int> Traverse(Node node, HashSet<Node> visited)
    {
        if (!visited.Add(node))
            return Enumerable.Empty<int>();

        return 
            new[] { node.Value }
            .Concat(node.Neighbors.SelectMany(n => Traverse(n, visited)));
    }
}
```
In this version, `Traverse` creates a new stack frame for each Node, meaning that the state of the `visited` set is passed as an argument.  
<br>
This means that node traversal in the OOP version is dependent on each previous step's state, while the functional version is independent of the previous one.  
<br>
This contrast in a relatively simple program is a good example of the difference between OOP and functional programming. By expressing a solution as a series of function compositions instead of a series of statements, we get a more predictable way of reasoning about our program. 
<br> 
	It might not be obvious why this is useful, so a look at some of the characteristics of functional programming is required. And honestly, I wouldn't say it is useful, as much as it being fun to write. React did very well with its functional components and hooks architecture, so I see no reason to not see if something like this might work well in other languages.

# Lazy Evaluation 

Lazy Evaluation is a model of computation where expressions are not evaluated unless explicitly required. This is useful because it doesn't perform any computation that isn't explicitly needed. 

# Pure functions

Here's a math equation: $$ \sum_{i=1}^{n} i = \frac{n(n+1)}{2} $$

And inline: $E = mc^2$

