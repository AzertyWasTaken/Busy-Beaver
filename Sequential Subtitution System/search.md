# Sequential Substitution System Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same, used to prune the search.

### Tree Normal Form

The search grows a "family tree" of programs instead of generating every program of a size at once:

- Start with a program with no rules: this is the root node.
- Complete the last rule by choosing its **input** symbol by symbol, then its **output** symbol by symbol.
- Run the program written so far after each completed rule:
  - if it **halts**, complete one more rule and keep exploring;
  - if it **times out**, keep the program as it is and stop extending this node.
- A node whose program uses the full size is kept.

A program that times out never reaches a step where no rule matches, so the rules that are missing from the program cannot change what it already does: appended rules are only consulted after every written rule fails, and the simulation never gets there. Every extension of a timed out program therefore times out too, and the search keeps the shorter program once instead of all of its extensions.

A program that halts cannot be pruned this way: an appended rule may match the string where the written rules did not, which can make the program run longer or forever. For example, `1>` halts in 0 steps, but `1>_0>` halts in 1 step and `1>_0>0` never halts.

The search therefore keeps two kinds of programs:

- programs that use exactly the size of the domain,
- smaller programs that already time out, which every larger extension would repeat.

That is why a holdout file such as `Holdouts/BBSS(8).txt` also contains holdouts of sizes 5, 6 and 7.

### Maximum Symbol

A symbol that is written for the first time is always the next unused one: the initial string already uses `0`, so the first new symbol can only be `1`, and after that the next new symbol can only be `2`, and so on.

- Why: symbols are only names, and the rules match symbols one by one, so renaming the symbols of a program to close the gaps between them gives a program with the same behavior. For example, `0>2` behaves exactly like `0>1`: both replace the initial `0` by a symbol that no rule matches. The symbol of the initial string keeps its name, so programs that use `1` and `2` without using `0` (like `12>`) are kept as well.

### Empty Input

A rule's input is never empty.

- Why: an empty input matches at every position and replaces nothing. A program that runs such a rule keeps the same string, tries the same rules again and repeats forever, so it never halts; a program that never runs it behaves exactly like the same program without that rule, because a rule is only consulted when every earlier rule fails. An empty input can never make a program halt, so the search skips it.

## Deciders

A **decider** proves a program **does not halt**.

### Zeros

The decider accepts a program when one of its rules has the input `0` and every rule up to that rule (including it) writes an output containing a `0`.

- Why: the string always contains a `0`. It starts with one, and every rule that can run before that point writes a `0` in its output. A rule with the input `0` matches every string that contains a `0`, so the program always has a rule to run: it never halts.
- The rules written after that rule never run, because a rule only runs when every earlier rule fails.
- Example: `0>0` is decided, since its only rule rewrites the `0` back into a `0`. The holdout `0>11_1>0` is not decided: its first rule writes no `0`, so the string could lose its last `0`.

### Cycler

A program is a cycler if it visits the same **string** twice. The string and the rules alone decide what happens at each step, so the second visit repeats the first visit's future forever: the program is stuck in a cycle of **period** `p` steps and never halts.

The decider simulates the program and compares the current string against a saved one. To catch any period, it saves a snapshot at every power-of-two step count (`4`, `8`, `16`, …) and compares it with the string at every step.

- Why power-of-two snapshots: a cycle of period `p` that starts before step `2^k` is back at the same string at step `2^k + p`, so the snapshot taken at step `2^k` matches the string at step `2^k + p` whenever `p ≤ 2^k`. Saving one snapshot per power of two therefore catches any cycle while keeping the number of comparisons proportional to the number of steps.
- Example: `0>1_1>0` (analyzed in `results.md`).

### Translated Cycler

A translated cycler repeats the same rewrite on a shifted copy of the string, so the string keeps a growing copy of the same block and never empties. A cycler is the special case where the copy does not move.

The decider simulates the program and remembers the rule that ran, the position where it replaced its input, and the string before the replacement. It reports a translated cycler when the same rule runs twice in a row and:

- the rule's input appears inside its own output, so the output contains the occurrence that the rule matches next;
- the string around the replaced input is the same in both steps, translated by the difference between the two positions.

The compared window covers the symbols that decide the next step: the longest input minus one symbol before the replaced input, and the written output plus the same margin after it.

- Why: a rule is matched by the symbols around an occurrence, so a window that repeats shifted means that the next rewrite is the previous rewrite translated by the shift. As long as that holds, the program keeps copying the same block of the string instead of emptying it, so it never halts.
- The margins give the window the size of an occurrence: the longest input minus one symbol on each side of the replaced input, plus the output.
- Example: `0>00` (analyzed in `results.md`) grows by one `0` per step, and `00>_0>01` grows by one `1` per step: its first rule needs two consecutive `0` symbols, but the string never contains two, so its second rule rewrites the only `0` at every step.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Tree Normal Form](https://wiki.bbchallenge.org/wiki/Tree_Normal_Form)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
