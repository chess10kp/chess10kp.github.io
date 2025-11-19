---
title: Git operations I forget sometimes
date: "2025-11-17"
tags: ["git", "development"]
---


There are some git actions that I need to perform often, but at work, I don't have access to [magit](http://magit.org) (If anyone has successfully petitioned to make emacs an essential piece of software at your workplace, email me). The second best choice is the command line, cause vscode's git interface is way too confusing and usually doesn't have what I need.

### Modifying Commits

#### Adding files to the latest commit

I often forget to commit my `package-lock.json` when adding packages. I now have three options: just commit it `chore: add missing files`, adding a completely useless commit or 2) squash the additional commit, but this takes over 5 seconds to accomplish. I choose 3) amend the latest commit. After `git add package-lock.json` to add your missing file, simply `git commit --amend` should pull you into a `COMMIT_MESSAGE` window, letting you add new files to your latest commit.

#### Undoing the latest commit

##### On Local

Sometimes, I commit files without testing as one does. "There's no way this breaks anything, it's only 3 new lines" and that ends as well as you would expect. In case I have the foresight to want to undo the previous commit *before* pushing it to prod,  `git reset --soft HEAD~1` saves me. This undoes the latest commit and moves all the files into the staging area. To clean out the staging area and assemble your commit from scratch, use `git reset --mixed HEAD~1` instead.


#### On Remote

After pushing code to a branch that I realize I've already opened a PR for, the only way out is to accept my mistake. `git revert HEAD` creates a new commit, undoing the previous commit, and admitting that I'm human sometimes.


### Getting on with my life

These are scenarios when I need to pivot to another task without losing out on what I'm already working on (but on the same branch)

#### Stashing 

Sometimes I spend too long working on some kind of task, and I realize that it doesn't matter anymore, because we've moved past pointless feature #23. The smart way would be to accept the sunk costs and keep going. But I usually prefer to save my changes just in case I might get back to it later.
Stashing simply stores all of your changes into a "save file", that you can come back to in the future. 

`git stash` simply saves your changes into a `stash`, that you can view with `git stash list`, and go back to using those changes with `git stash apply`, optionally specifying a stash index at the end.


### Staging portions of a file

When working on python projects, I often end up making changes throughout a large file, but I really only want to commit some of those changes and discard the rest. Here's where I bring up one of `git`'s interactive features with `git add -p`, which brings up a sweet interactive window that lets me stage each hunk manually. Once that's done, `git commit` and `git reset` brings back my working directory to the state that I want it to be in.

### Squashing commits so I don't look like I'm overworking myself

This one is self explanatory. I like to commit as often as possible, so I don't lose progress, so squashing those commits at the end is pretty useful to not pollute your git log. Rebasing is pretty simple with  `git rebase -i`. This brings up an interactive menu, where you select which commits you want to keep with `pick` and toss the rest.


### Worktrees

This is the one I use way too often.
When I want to work on a codebase while still letting an agent work on another feature in parallel, `git worktree` is my solution. It lets you check out multiple branches simultaneously into separate, independent directories all linked to the same central repository. So cool!

`git worktree add ../feature-1 -b fix-101 main`

You now have two active working directories. One for your main feature, and one (at ../feature-1) where AI works, while you just debugging errors from its previous day's work without having to deal with even more bugs.

When you're done, simply delete the directory and tell Git to forget the link:

`git worktree remove ../feature-1`


### Conclusion

I really use worktrees the most out of the everything discussed but stashing has saved me more times than I can count. Git really is a lot more powerful than this, but I don't want to spend all my time reading `man git` (on second thought, this sounds kinda fun).
