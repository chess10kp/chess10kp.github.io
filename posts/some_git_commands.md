---
title: Git op
date: "2025-11-17"
tags: ["git", "development"]
---

### Modifying Commits
#### Adding files to the latest commit

I often forget to commit my `package-lock.json` when adding packages. I now have three options: just commit it `chore: add missing files`, adding a completely useless commit or 2) squash the additional commit, but this takes over 5 seconds to accomplish. I choose 3) amend the latest commit. After `git add package-lock.json` to add your missing file, simply `git commit --amend --no-edit` adds new files from the staging area and commits them.

#### Undoing the latest commit

##### On Local


Sometimes, I commit files without testing. To undo the previous commit *before* pushing it,  `git reset --soft HEAD~1` is useful. This undoes the latest commit and moves all the files into the staging area. To clean out the staging area and assemble your commit from scratch, use `git reset --mixed HEAD~1` instead.


#### On Remote

To undo a pushed commit, `git revert HEAD` creates a new commit that reverts the changes.


### Getting on with my life

These are scenarios when I need to pivot to another task without losing out on what I'm already working on (but on the same branch)

#### Stashing 


Sometimes it's necessary to switch tasks and save the current changes. Stashing stores your changes for later use. Stashing simply stores all of your changes into a "save file", that you can come back to in the future. 

`git stash` simply saves your changes into a `stash`, that you can view with `git stash list`, and go back to using those changes with `git stash apply`, optionally specifying a stash index at the end.


### Staging portions of a file

When working on python projects, I often end up making changes throughout a large file, but I really only want to commit some of those changes and discard the rest. Here's where I bring up one of `git`'s interactive features with `git add -p`, which brings up a sweet interactive window that lets me stage each hunk manually. Once that's done, `git commit` and `git reset` brings back my working directory to the state that I want it to be in.

### Squashing commits to clean up your commit history

This command is fairly straightforward. I like to commit as often as possible, so I don't lose progress, so squashing those micro-commit at the end is pretty useful to not pollute your git log. Rebasing is pretty simple with  `git rebase -i`. This brings up an interactive menu, where you select which commits you want to keep with `pick` and toss the rest.


### Worktrees

This is the one I use way too often.
When I want to work on a codebase while still letting an agent work on another feature in parallel, `git worktree` is my solution. It lets you check out multiple branches simultaneously into separate, independent directories all linked to the same central repository. So cool!

`git worktree add ../feature-1 -b fix-101 main`

You now have two active working directories. One for your main feature, and one (at ../feature-1) where AI works, while you are debugging errors from its previous day's work without having to deal with even more bugs.

When you're done, simply delete the directory and tell Git to forget the link:

`git worktree remove ../feature-1`


### Conclusion

I really use worktrees the most out of the everything discussed but stashing has saved me more times than I can count. Git really is a lot more powerful than this, but I don't want to spend all my time reading `man git` (on second thought, this sounds kinda fun).
