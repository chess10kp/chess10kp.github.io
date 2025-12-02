---
title: Git Worktrees give you a free dev team
date: "2025-11-17"
tags: ["git", "development", "llm"]
---

[Git Worktrees](https://git-scm.com/docs/git-worktree) can literally change your life.

As of 2025, LLMs are incredibly good at making isolated changes to your codebase. They can add a feature, fix a bug, refactor a module. But they do it one at a time. And that means that you're stuck waiting for a refactor to complete when you could be doing other things instead.
I might be waiting for [Claude Code](https://claude.ai) to finish the auth refactor before I can start optimizing my db queries. Or I interrupt it when it takes too long, wasting time and tokens. Worktrees fix all of this.  

### Wait, what even are worktrees?  

Git worktrees let you check out multiple branches of the same repo at the same time. Each one lives in its own directory. So instead of constantly switching branches and stashing changes, you just... have multiple versions of your codebase sitting there.
Here's what it looks like:

```bash
# Your main codebase
cd ~/projects/snip

# Create a worktree for the auth refactor
git worktree add ../snip-auth auth-refactor

# Another for database work
git worktree add ../snip-db db-optimization

git worktree add ../snip-payfix payment-error
```

Now you've got three folders. Three branches. All connected to the same git repo, but completely independent working directories.

Here's where it gets interesting.

Open three different [Claude Code](https://www.claude.com/product/claude-code) or [Cursor](https://www.cursor.com) (or [OpenCode](https://opencode.ai)) instances. Point each one at a different worktree.

Instance 1: "Refactor the authentication to use JWT"  
Instance 2: "Optimize these queries by adding db indices"  
Instance 3: "Payment flow is broken, here's the stacktrace"  

They all work, at the same time! No conflicts. No more "waiting" for AI to finish a task, because *you* can keep working on a separate worktree as well. 

When one's done, you review and merge it. 

```bash
git checkout main # or whatever branch you worktree'd off of 
git merge auth-refactor 

# When you're done with one, remove it
git worktree remove ../snip-auth

# Clean up any old references
git worktree prune
```

The others keep going.  

The thing about LLMs is they're really good at focused work. Ask it to juggle three things at once and it gets messy. When using worktrees, each instance gets one task, one branch, one directory. 

Plus, you can actually test everything in parallel. Run each version of your app on a different port. See how they all work before any of them touch your main branch. 

### It really is a dev team

...except the team works for free and doesn't need breaks. As long as Silicon Valley provides free or subsidized LLM access, you can literally 10x your productivity. *If* you have a clear path ahead on how you want to build your product.

It also changes how you think about building stuff. Instead of "what should I work on next?" you start asking "what can I work on in parallel?" You're not waiting for the LLM anymore. You're coordinating multiple workstreams.


Git worktrees have been around since like 2015. LLMs that can actually ship code have been around for maybe two years. We're still figuring out the best ways to use them together.

So stop waiting for your LLM, and instead give it some coworkers.

**Bonus Tip**: If you're working on a web project, use `pnpm` instead of `npm` so you aren't installing your node dependencies into each worktree.
