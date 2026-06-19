---
title: I fixed Python's functional chaining
date: "2025-12-26"
tags: ["python", "fp"]
tagline: obj.map().filter() is a great pattern, but python doesn't have it! 
---


Javascript embraced functional programming and implemented it in a really idiomatic way. I love how arrow functions they mirror the FP style. Python's take on FP has been List comprehensions. They're are a very readable alternative to map or filter, so I was hyped to see what their accumulate function was. I was very disappointed to find out that looks awful. Here's a comparison with two other languages that have varying degrees of functional programming baked into the core.
```javascript
    [1,2,3,4].map(x => x*2).reduce((e, i) => e + i)
```
```haskell
    double :: Int -> Int
    double x = 2 * x
    foldl (+) 0 (double [1,2,3,4])
```
And python:
```python
    from functools import reduce
    from operator import add
    reduce(add, y: x + y , map(lambda x: x*2, [1,2,3,4]))

```
Python has its own interpretation of how it wants functional programming to be done. The pythonic approach uses List Comprehension to simplify their syntax, and it looks like
```python
    functools.reduce(lambda x: x, [i * 2 for i in [1,2,3,4]), 0)
```

I don't like how there isn't a list-comprehension like syntax for `accumulate`. Chaining functional calls in Python just doesn't look right. 

When I think of data pipelines (which is what I use reduce for) I like to see the data flow from left to right but Python sprung for a lisp like approach with the data flowing from right-left.

I want maps and reductions to always flow like this:

    A |> transformed |> summation |> final result

One reason I can think of for why it isn't this way is that it allows for any class to define their own `__iter__` functions. This means map, and filter can be run on *any* class, not iterable classes like `List`. That's pretty cool.

But I still need functional chaining for transformation pipelines. So I found a way to hack it in.

Since the transformations need to flow from left to right, \`map\` and \`filter\` can no longer be functions. To have functional chaining like \`a.map().filter()\`, I'll have to add a wrapper class to store the item and then map over it. Instead of wrapping all your objects into function calls, one thing you could use is the `__ror__` magic method, which lets you define the XOR (A | B) operator for classes. You don't lose much here since you don't really use `|` for classes anyway.
```python
    import builtins
    import functools 
    from matmul import add
    class W:
        def __init__(self, it):
            self.item = it
            self.type = type(it)
    
        @property
        def get(self):
            return self.item
    
        def __ror__(self, other):
            return W(other)
    
        def map(self, func):
            self.item = builtins.map(func, self.item)
            return self
    
        def reduce(self, func, *args):
            return functools.reduce(func, self.item, *args)
```

That lets you do something like this

```python
    result = ([1, 2, 3] | W(None)).map(lambda x: x * 2).reduce(add).get
```

This looks like much better to me, and the data flow is a lot more clear. Using a monadic pattern, we define a class wrapping over any generic enumerable class, and then implement the `map` and `reduce` methods. While I like this approach, I think that it still feels a bit too verbose, especially compared to Javascript's  syntax.

We need to go deeper.

What we're looking for is a way to implicitly wrap `W` around any iterable when the map function is called without us having to use the `|` operator first. At the same time, the map functionality should behave the same way as it does normally. The idea is to simply hijack the global `map`, `reduce` and `filter` methods as our own! 
```python
    def map(f, it): return W(builtins.map(f, it))
    def filter(f, it): return W(builtins.filter(f, it))

    import builtins
    import functools
    import itertools
    
    class W:
        def __init__(self, it):
            self.item = it
    
        def map(self, func):
            return W(builtins.map(func, self.item), self._origin_type)
    
        def filter(self, func):
            return W(builtins.filter(func, self.item), self._origin_type)
    
        def __iter__(self):
            return self
    
        def __next__(self):
            return next(self.item)
    
        def reduce(self, func, *args):
            return functools.reduce(func, self.item, *args)
    
    def map(f, it): return W(builtins.map(f, it))
    def filter(f, it): return W(builtins.filter(f, it))
```
Now, we have real functional chaining in Python. Our initial implementation can look something like this:
```python
    map(lambda x: x * 2 ,[1,2,3,4]).filter(lambda x: x!=10)
```

One gotcha is that I've now lost type information, so lets add that back in: 

```python
    def __repr__(self):
        return list(type(self.item))
```

Lets check our example and convert our original data back to a list

```python
    w = map(lambda x: x * 2 ,[1,2,3,4]).filter(lambda x: x!=10)
    print(list(w)) # works 
    print(list(w)) # returns [] ???? 
```

What's going on here? Since we wrap our item our `W` class, any other function that consumes that data will do so with an iterator. And in python, only pass through the data once, meaning we lose our data once it's used once. A fix seems to be using `itertools.tee`. The `tee` function creates a new iterator of the data each time, so you never lose your original data.

```python
    class W:
    
        def __init__(self, it, origin_type=None):
            self._master = iter(it)
            self._origin_type = origin_type or type(it)
    
        ...
        def __iter__(self):
            self._master, new_iter = itertools.tee(self._master)
            return new_iter
    
        ...

    w = map(lambda x: x * 2 ,[1,2,3,4]).filter(lambda x: x!=10)
    print(list(w)) # creates a new copy of the data and an iterator  
    print(list(w)) # creates a new copy of the data and an iterator   
```

Now, you can chain functions just like with JS!

```python
print([1,2,3,4]
		.map(lambda x: x * 2)
		.filter(lambda x: x != 3)
		.reduce(lambda x, y: x + y, 0)
		)

``` 

Python is a great language to work with, because of its simple syntax and dynamic typing. The one thing I missed from other languages is functional chaining, and looks like its pretty simple to drop something like this in your `__init__.py` file so that it automatically gets sourced throughout your entire workspace. I don't recommend using this in production, but play around with it is loads of fun.

