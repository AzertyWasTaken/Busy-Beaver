# Post Tag System Specification

## Composition

- A finite **queue** of **symbols**: `0`, `1`, `2`, …

- A **code** consisting of one **production rule** per symbol.

  - A production rule is a possibly empty sequence of symbols.

### Program Format

A program is written by concatenating the production rules in symbol order, and separating the rules with `_`. Each symbol is written as its name: `0`, `1`, `2`, … An undefined symbol is written `x`. Whitespace is ignored.

An empty production rule is written as nothing between two separators, so a trailing `_` marks an empty last rule.

For example, `11_021_2` defines `0 → 11`, `1 → 021` and `2 → 2`, and `10_` defines `0 → 10` and an empty rule for `1`.

## Execution

- The Post tag system starts out with **queue** equal to `00`.

- At each step of the computation, the Post tag system:

  - **reads** the first symbol of the **queue**.
  - **appends** that symbol's **production rule** to the end of the **queue**.
  - **deletes** the first two symbols of the **queue** (including the symbol it read).

- The Post tag system halts when fewer than two symbols remain in the **queue**.

## Function

The function *BBPT(n)* is the largest number of steps that any Post tag system of size *n* takes before halting.

- The size of a Post tag system is the total number of symbols in every production rule.
- Post tag systems that never halt are not counted.
- Each step reads one symbol, appends one production rule and deletes two symbols.
- The halting step counts as a step, so the PTS `0` halts in 1 step.

## See Also

- [Post Tag System](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
