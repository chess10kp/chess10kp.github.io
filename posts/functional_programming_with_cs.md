---
title: Functional Programming with C#
date: "2025-05-19"
tags: ["csharp", "functional-programming", "lambda-calculus"]
---

# Introduction

This post is an attempt at writing C# as if it were Haskell, a [functional language](https://en.wikipedia.org/wiki/Functional_programming). Yes, I know [F#](https://fsharp.org) exists, but the point is to keep using an OOP language where it is useful, while using a functional approach to make transformations more expressive (the real reason is because it's fun).

Consider this example of a depth-first search on a graph using an OOP approach:

```csharp
public class DFS
{
    public void Traverse(Node node, HashSet<Node> visited)
    {
        if (visited.Contains(node)) return;
        visited.Add(node);
        foreach (var neighbor in node.Neighbors)
            Traverse(neighbor, visited);
    }
}
```

Notice how in the Traverse method, we mutate the visited set at each step. Mutable state and side effects are a common pattern in OOP. The equivalent functional programming approach might look like this:

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

In this version, Traverse creates a new stack frame for each Node, meaning that the state of the visited set is passed as an argument.  

This means that node traversal in the OOP version is dependent on each previous step's state, while the functional version is independent of the previous one.  

By expressing a solution as a series of function compositions instead of a series of statements, we get a more predictable way of reasoning about our program.

## [Lazy Evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation)

The best way I could think of to create lazy sequences would be yield on an `IEnumerable`

```csharp
public static IEnumerable<int> InfiniteRange(int start)
{
    while (true)
        yield return start++;
}
```

Here, `InfiniteRange` doesn't literally store an infinite list of numbers, rather producing each element of the list lazily.  

For anything that isn't an `IEnumerable`, wrapping it in a callback should suffice.

```csharp
public static Func<T> LazyWrapper<T>(T value) {
    return () => value;
}
```

## [Functional composition](https://en.wikipedia.org/wiki/Function_composition)

Thankfully LINQ exists, so we already have a pretty sweet querying language that chains compositionally.

```csharp
var evenSquares = InfiniteRange(1)
    .Where(x => x % 2 == 0)
    .Select(x => x * x)
    .Take(5);
```

Other types of chaining is painful though. 

```csharp
int AddOne(int i) {
    return i + 1; 
}
```

If you wanted to get two instead, you would chain `AddOne(AddOne(0))`, but that doesn't look nice at all. The equivalent Haskell is as follows

```haskell
succ :: Int -> Int
succ x = x + 1

two = succ . succ $ 0
```

Getting something like this should be done with a custom class.

```csharp
public class Compose<T>
{
    private readonly Func<T, T> _composition;

    public Compose(params Func<T, T>[] functions)
    {
        _composition = x =>
        {
            T result = x;
            foreach (var f in functions)
                result = f(result);
            return result;
        };
    }

    public T Apply(T input) => _composition(input);
}
```

Using it is as simple as 

```csharp
var addTwo = new Compose<int>(AddOne, AddOne);
var result = addTwo.Apply(0); // 2
```

## [Pure Functions](https://en.wikipedia.org/wiki/Pure_function)

Just make functions that don't have internal state! The easiest way to make this work is to just lift everything into a parameter, even for class methods. Think something like: 

```csharp
public static int SumList(IEnumerable<int> numbers, int accumulator = 0)
{
    if (!numbers.Any()) return accumulator;
    return SumList(numbers.Skip(1), accumulator + numbers.First());
}
```

instead of 

```csharp
public static int SumList(IEnumerable<int> numbers)
{
    int s = 0;
    foreach(var n in numbers) {
        s += n;
    }
    return s;
}
```

Now that we got the basics covered, what's left is to implement more advanced features and make C# finally readable.

## [Functors](https://en.wikipedia.org/wiki/Functor)

A functor is basically a box that you can map over. If you've used LINQ, you've already been using functors without knowing it. `IEnumerable<T>` is a functor, and `Select` is the `fmap` operation.

```csharp
var numbers = new[] { 1, 2, 3 };
var doubled = numbers.Select(x => x * 2); // [2, 4, 6]
```

The functor pattern is more interesting when dealing with things that might not have values. Let's create a `Maybe<T>` type:

```csharp
public abstract record Maybe<T>
{
    public sealed record Just(T Value) : Maybe<T>;
    public sealed record Nothing : Maybe<T>;
    
    public Maybe<TResult> Map<TResult>(Func<T, TResult> f) =>
        this switch
        {
            Just(var value) => new Maybe<TResult>.Just(f(value)),
            Nothing => new Maybe<TResult>.Nothing(),
            _ => throw new InvalidOperationException()
        };
}
```

Now you can chain transformations without worrying about null:

```csharp
var result = new Maybe<int>.Just(5)
    .Map(x => x * 2)
    .Map(x => x + 3); // Just(13)

var empty = new Maybe<int>.Nothing()
    .Map(x => x * 2)
    .Map(x => x + 3); // Nothing
```

The key insight is that the functor handles the context (the "maybe there's a value" part), while you just write the transformation as if the value was always there.

## [Applicative Functors](https://en.wikipedia.org/wiki/Applicative_functor)

Functors let you apply a regular function to a wrapped value. But what if the function itself is wrapped? That's where applicatives come in.

```csharp
public abstract record Maybe<T>
{
    public sealed record Just(T Value) : Maybe<T>;
    public sealed record Nothing : Maybe<T>;
    
    public Maybe<TResult> Map<TResult>(Func<T, TResult> f) =>
        this switch
        {
            Just(var value) => new Maybe<TResult>.Just(f(value)),
            Nothing => new Maybe<TResult>.Nothing(),
            _ => throw new InvalidOperationException()
        };
    
    public Maybe<TResult> Apply<TResult>(Maybe<Func<T, TResult>> wrappedFunc) =>
        (this, wrappedFunc) switch
        {
            (Just(var value), Just(var func)) => new Maybe<TResult>.Just(func(value)),
            _ => new Maybe<TResult>.Nothing()
        };
    
    public static Maybe<T> Pure(T value) => new Just(value);
}
```

This lets you combine multiple wrapped values in interesting ways:

```csharp
Maybe<int> maybeAdd(Maybe<int> a, Maybe<int> b)
{
    var addFunc = new Maybe<Func<int, int>>.Just(x => x);
    return b.Apply(a.Map<Func<int, int>>(x => y => x + y));
}

var result = maybeAdd(
    new Maybe<int>.Just(5),
    new Maybe<int>.Just(3)
); // Just(8)
```

Applicatives are useful when you have multiple independent computations that might fail, and you want to combine their results.

## [Monads](https://en.wikipedia.org/wiki/Monad_(functional_programming))

Monads are functors with extra power. They let you chain operations where each step depends on the result of the previous one, and each operation returns a wrapped value.

The key operation is `Bind` (also called `flatMap` or `>>=` in Haskell):

```csharp
public abstract record Maybe<T>
{
    public sealed record Just(T Value) : Maybe<T>;
    public sealed record Nothing : Maybe<T>;
    
    public Maybe<TResult> Map<TResult>(Func<T, TResult> f) =>
        this switch
        {
            Just(var value) => new Maybe<TResult>.Just(f(value)),
            Nothing => new Maybe<TResult>.Nothing(),
            _ => throw new InvalidOperationException()
        };
    
    public Maybe<TResult> Bind<TResult>(Func<T, Maybe<TResult>> f) =>
        this switch
        {
            Just(var value) => f(value),
            Nothing => new Maybe<TResult>.Nothing(),
            _ => throw new InvalidOperationException()
        };
    
    public static Maybe<T> Return(T value) => new Just(value);
}
```

The difference between `Map` and `Bind` is subtle but important. `Map` takes a function that returns an unwrapped value, while `Bind` takes a function that returns a wrapped value. This prevents you from ending up with `Maybe<Maybe<T>>`.

```csharp
Maybe<int> Divide(int a, int b) =>
    b == 0 
        ? new Maybe<int>.Nothing() 
        : new Maybe<int>.Just(a / b);

var result = new Maybe<int>.Just(20)
    .Bind(x => Divide(x, 2))
    .Bind(x => Divide(x, 5)); // Just(2)

var divideByZero = new Maybe<int>.Just(20)
    .Bind(x => Divide(x, 0))
    .Bind(x => Divide(x, 5)); // Nothing
```

LINQ's `SelectMany` is actually the `Bind` operation, which means C# already has monad support built in! You can even use query syntax as a form of do-notation:

```csharp
var result = 
    from x in new Maybe<int>.Just(5)
    from y in new Maybe<int>.Just(3)
    select x + y; // Just(8)
```

Another useful monad is `Result<T, E>` for error handling:

```csharp
public abstract record Result<T, E>
{
    public sealed record Ok(T Value) : Result<T, E>;
    public sealed record Error(E ErrorValue) : Result<T, E>;
    
    public Result<TResult, E> Bind<TResult>(Func<T, Result<TResult, E>> f) =>
        this switch
        {
            Ok(var value) => f(value),
            Error(var error) => new Result<TResult, E>.Error(error),
            _ => throw new InvalidOperationException()
        };
}
```

This lets you chain operations that might fail while preserving error information, without throwing exceptions.

## [Pattern Matching](https://en.wikipedia.org/wiki/Pattern_matching)

C# has gotten much better at pattern matching in recent versions. Switch expressions replace verbose if-else chains with something that actually looks functional.

```csharp
string Describe(Maybe<int> maybe) => maybe switch
{
    Maybe<int>.Just(var value) when value > 10 => "Big number",
    Maybe<int>.Just(var value) => $"Small number: {value}",
    Maybe<int>.Nothing => "No value",
    _ => throw new InvalidOperationException()
};
```

You can pattern match on types, properties, and even destructure tuples:

```csharp
string AnalyzePoint((int x, int y) point) => point switch
{
    (0, 0) => "Origin",
    (var x, 0) => $"On X-axis at {x}",
    (0, var y) => $"On Y-axis at {y}",
    (var x, var y) when x == y => "On diagonal",
    (var x, var y) => $"Point at ({x}, {y})"
};
```

Pattern matching really shines when combined with algebraic data types. It gives you exhaustiveness checking and makes your code much more declarative.

## [Algebraic Data Types](https://en.wikipedia.org/wiki/Algebraic_data_type)

ADTs come in two flavors: product types (like tuples or records) and sum types (discriminated unions). C# records make this pretty natural.

Product types are straightforward:

```csharp
public record Person(string Name, int Age, string Email);
```

Sum types are more interesting. They represent "this OR that" rather than "this AND that":

```csharp
public abstract record Shape
{
    public sealed record Circle(double Radius) : Shape;
    public sealed record Rectangle(double Width, double Height) : Shape;
    public sealed record Triangle(double Base, double Height) : Shape;
}
```

Combined with pattern matching, this becomes incredibly expressive:

```csharp
double CalculateArea(Shape shape) => shape switch
{
    Shape.Circle(var r) => Math.PI * r * r,
    Shape.Rectangle(var w, var h) => w * h,
    Shape.Triangle(var b, var h) => 0.5 * b * h,
    _ => throw new InvalidOperationException()
};
```

The compiler will even warn you if you forget to handle a case. This is huge for making illegal states unrepresentable:

```csharp
public abstract record PaymentStatus
{
    public sealed record Pending : PaymentStatus;
    public sealed record Processing(string TransactionId) : PaymentStatus;
    public sealed record Completed(string TransactionId, DateTime CompletedAt) : PaymentStatus;
    public sealed record Failed(string Reason) : PaymentStatus;
}
```

Now there's no way to accidentally have a completed payment without a transaction ID, because the type system won't let you.

## [Currying and Partial Application](https://en.wikipedia.org/wiki/Currying)

Currying transforms a function that takes multiple arguments into a chain of functions that each take a single argument. In Haskell, all functions are curried by default. In C#, we have to do it manually.

```csharp
public static class Curry
{
    public static Func<T1, Func<T2, TResult>> Apply<T1, T2, TResult>(
        Func<T1, T2, TResult> f) =>
        x => y => f(x, y);
    
    public static Func<T1, Func<T2, Func<T3, TResult>>> Apply<T1, T2, T3, TResult>(
        Func<T1, T2, T3, TResult> f) =>
        x => y => z => f(x, y, z);
}
```

This lets you do partial application naturally:

```csharp
Func<int, int, int> Add = (a, b) => a + b;
var curriedAdd = Curry.Apply(Add);

var addFive = curriedAdd(5);
var result = addFive(3); // 8
```

Partial application is useful when you want to configure a function and reuse it:

```csharp
Func<string, string, bool> Contains = (text, substring) => 
    text.Contains(substring);

var curriedContains = Curry.Apply(Contains);
var containsHello = curriedContains("Hello");

var strings = new[] { "Hello World", "Goodbye", "Hello there" };
var filtered = strings.Where(s => containsHello(s));
```

You can also create a more general partial application helper:

```csharp
public static class Partial
{
    public static Func<T2, TResult> Apply<T1, T2, TResult>(
        Func<T1, T2, TResult> f, T1 arg1) =>
        x => f(arg1, x);
    
    public static Func<T2, T3, TResult> Apply<T1, T2, T3, TResult>(
        Func<T1, T2, T3, TResult> f, T1 arg1) =>
        (x, y) => f(arg1, x, y);
}
```

## [Immutability](https://en.wikipedia.org/wiki/Immutable_object)

Immutability is the foundation of functional programming. If nothing ever changes, you don't have to worry about side effects or shared state.

C# has gotten much better at this with records and init properties:

```csharp
public record User(string Name, string Email, int Age);

var user = new User("Alice", "alice@example.com", 25);
var olderUser = user with { Age = 26 }; // Creates a new instance
```

The `with` expression creates a copy with some properties changed, leaving the original untouched.

For collections, use immutable types:

```csharp
using System.Collections.Immutable;

var list = ImmutableList.Create(1, 2, 3);
var newList = list.Add(4); // Returns a new list, original unchanged
```

For classes that can't be records, use readonly and init:

```csharp
public class Config
{
    public string ServerUrl { get; init; }
    public int Timeout { get; init; }
    public ImmutableList<string> AllowedHosts { get; init; }
    
    public Config(string serverUrl, int timeout, ImmutableList<string> allowedHosts)
    {
        ServerUrl = serverUrl;
        Timeout = timeout;
        AllowedHosts = allowedHosts;
    }
}
```

Immutability makes your code easier to reason about because values don't change unexpectedly. Combined with pure functions, you get code that's predictable, testable, and composable.

The key insight of functional programming is that by restricting what you can do (no mutation, no side effects, no null), you actually make your code more powerful and easier to understand. C# might not be Haskell, but with a little creativity, you can get pretty close.
