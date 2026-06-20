---
title: Functional Programming with C#
date: "2025-05-19"
tags: ["csharp", "functional-programming"]
---

# Introduction

This post is an attempt at writing C# as if it were a functional language like Haskell. Yes, I know [F#](https://fsharp.org) exists, but the point is to keep using an OOP language where it's actually useful while sneaking in a functional approach to make transformations more expressive. The real reason is because it's fun.

Consider this depth-first search on a graph, written the way you'd normally write it:

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

We mutate the `visited` set at every step. Mutable state and side effects are just how OOP works. The functional version looks like this instead:

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

Here `Traverse` gets a fresh stack frame per node, and the state of `visited` is passed along as an argument. The OOP version's traversal depends on whatever the previous step did to the set, while the functional version doesn't care. Expressing a solution as a chain of function compositions instead of a list of statements gives you a much more predictable way to reason about what your program is doing.

## Lazy Evaluation

The cleanest way to get lazy sequences is to `yield` on an `IEnumerable`:

```csharp
public static IEnumerable<int> InfiniteRange(int start)
{
    while (true)
        yield return start++;
}
```

`InfiniteRange` doesn't store an infinite list anywhere, it just hands you each element as you ask for it.

For anything that isn't an `IEnumerable`, wrapping it in a callback does the job:

```csharp
public static Func<T> LazyWrapper<T>(T value) {
    return () => value;
}
```

## Functional composition

Thankfully LINQ exists, so we already have a pretty sweet querying language that chains compositionally.

```csharp
var evenSquares = InfiniteRange(1)
    .Where(x => x % 2 == 0)
    .Select(x => x * x)
    .Take(5);
```

Every other kind of chaining is painful though.

```csharp
int AddOne(int i) {
    return i + 1;
}
```

If you want two, you write `AddOne(AddOne(0))`, which reads inside-out and looks terrible. Here's the same thing in Haskell:

```haskell
succ :: Int -> Int
succ x = x + 1

two = succ . succ $ 0
```

To get anything close to that in C# you need a little class:

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

And then it's just:

```csharp
var addTwo = new Compose<int>(AddOne, AddOne);
var result = addTwo.Apply(0); // 2
```

## Pure Functions

Just make functions that don't have internal state! The trick is to lift everything into a parameter, even for class methods:

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

Now that we've got the basics covered, let's implement the fun stuff and make C# finally readable.

## Functors

A functor is just a box you can map over. If you've used LINQ you've been using functors this whole time without knowing it. `IEnumerable<T>` is a functor and `Select` is its `fmap`.

```csharp
var numbers = new[] { 1, 2, 3 };
var doubled = numbers.Select(x => x * 2); // [2, 4, 6]
```

It gets more interesting once the box might be empty. Let's build a `Maybe<T>`:

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

Now you can chain transformations and never once think about null:

```csharp
var result = new Maybe<int>.Just(5)
    .Map(x => x * 2)
    .Map(x => x + 3); // Just(13)

var empty = new Maybe<int>.Nothing()
    .Map(x => x * 2)
    .Map(x => x + 3); // Nothing
```

The functor quietly carries the "maybe there's nothing here" part, and you get to write the code as if the value was always there.

## Applicative Functors

A functor lets you apply a normal function to a wrapped value. But what if the function itself is wrapped? That's an applicative. We just bolt an `Apply` onto the same `Maybe<T>`:

```csharp
public Maybe<TResult> Apply<TResult>(Maybe<Func<T, TResult>> wrappedFunc) =>
    (this, wrappedFunc) switch
    {
        (Just(var value), Just(var func)) => new Maybe<TResult>.Just(func(value)),
        _ => new Maybe<TResult>.Nothing()
    };

public static Maybe<T> Pure(T value) => new Just(value);
```

This lets you combine multiple wrapped values:

```csharp
Maybe<int> maybeAdd(Maybe<int> a, Maybe<int> b) =>
    b.Apply(a.Map<Func<int, int>>(x => y => x + y));

var result = maybeAdd(
    new Maybe<int>.Just(5),
    new Maybe<int>.Just(3)
); // Just(8)
```

Handy when you've got a bunch of independent computations that might each fail and you want to mash their results together. If any one of them is `Nothing`, the whole thing is `Nothing`.

## Monads

Everyone says you lose the ability to explain monads the moment you understand them, so here's my attempt before that happens to me.

A monad is a functor that lets each step depend on the result of the previous one, where every step also returns a wrapped value. The operation that makes it work is `Bind` (a.k.a. `flatMap`, or `>>=` if you're feeling Haskell):

```csharp
public Maybe<TResult> Bind<TResult>(Func<T, Maybe<TResult>> f) =>
    this switch
    {
        Just(var value) => f(value),
        Nothing => new Maybe<TResult>.Nothing(),
        _ => throw new InvalidOperationException()
    };
```

The difference between `Map` and `Bind` is small but it matters. `Map` takes a function returning an unwrapped value, `Bind` takes one returning a wrapped value. Without `Bind` you'd end up holding a `Maybe<Maybe<T>>`, which nobody wants.

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

Here's the fun part: LINQ's `SelectMany` *is* `Bind`, which means C# has had monads built in this whole time. You can even abuse query syntax as do-notation:

```csharp
var result =
    from x in new Maybe<int>.Just(5)
    from y in new Maybe<int>.Just(3)
    select x + y; // Just(8)
```

The other monad you'll actually reach for is `Result<T, E>` for error handling:

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

Chain as many fallible steps as you want, keep the error around, and never throw an exception to do it.

## Pattern Matching

C# pattern matching has gotten genuinely good. Switch expressions take those verbose if-else ladders and turn them into something that actually looks functional:

```csharp
string Describe(Maybe<int> maybe) => maybe switch
{
    Maybe<int>.Just(var value) when value > 10 => "Big number",
    Maybe<int>.Just(var value) => $"Small number: {value}",
    Maybe<int>.Nothing => "No value",
    _ => throw new InvalidOperationException()
};
```

You can match on types, properties, and destructure tuples while you're at it:

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

It really comes alive next to algebraic data types, which conveniently is the next thing.

## Algebraic Data Types

ADTs come in two flavors: product types (tuples, records) and sum types (discriminated unions). Records make this painless.

Product types are the boring half:

```csharp
public record Person(string Name, int Age, string Email);
```

Sum types are the fun half. They mean "this OR that" instead of "this AND that":

```csharp
public abstract record Shape
{
    public sealed record Circle(double Radius) : Shape;
    public sealed record Rectangle(double Width, double Height) : Shape;
    public sealed record Triangle(double Base, double Height) : Shape;
}
```

Pair that with pattern matching and it gets expressive fast:

```csharp
double CalculateArea(Shape shape) => shape switch
{
    Shape.Circle(var r) => Math.PI * r * r,
    Shape.Rectangle(var w, var h) => w * h,
    Shape.Triangle(var b, var h) => 0.5 * b * h,
    _ => throw new InvalidOperationException()
};
```

The compiler even nags you when you forget a case, which is how you make illegal states unrepresentable:

```csharp
public abstract record PaymentStatus
{
    public sealed record Pending : PaymentStatus;
    public sealed record Processing(string TransactionId) : PaymentStatus;
    public sealed record Completed(string TransactionId, DateTime CompletedAt) : PaymentStatus;
    public sealed record Failed(string Reason) : PaymentStatus;
}
```

There's now no way to have a completed payment without a transaction ID, because the type system flat out won't let you build one.

## Currying and Partial Application

Currying turns a function of many arguments into a chain of functions that each take one. Haskell does this to every function by default. In C# we do it by hand:

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

Which gets you partial application basically for free:

```csharp
Func<int, int, int> Add = (a, b) => a + b;
var curriedAdd = Curry.Apply(Add);

var addFive = curriedAdd(5);
var result = addFive(3); // 8
```

The nice thing is configuring a function once and reusing it everywhere:

```csharp
Func<string, string, bool> Contains = (text, substring) =>
    text.Contains(substring);

var containsHello = Curry.Apply(Contains)("Hello");

var strings = new[] { "Hello World", "Goodbye", "Hello there" };
var filtered = strings.Where(s => containsHello(s));
```

## Immutability

If nothing ever changes, there's no shared state to corrupt and no side effects to chase down. This is the whole point, and C# finally has decent tools for it.

Records plus `with` do most of the work:

```csharp
public record User(string Name, string Email, int Age);

var user = new User("Alice", "alice@example.com", 25);
var olderUser = user with { Age = 26 }; // a new instance, original untouched
```

For collections, reach for the immutable types:

```csharp
using System.Collections.Immutable;

var list = ImmutableList.Create(1, 2, 3);
var newList = list.Add(4); // new list, original unchanged
```

And when you're stuck with a class that can't be a record, `init` properties get you read-only-after-construction without the ceremony.

The whole trick of functional programming is that locking yourself out of things, no mutation, no side effects, no null, somehow makes your code easier to follow instead of harder. C# isn't Haskell, but with a bit of creativity you can get surprisingly close.
