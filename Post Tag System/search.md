# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Maximum Symbol

The tag system must not "skip" a symbol during execution, for continuing a production rule or creating a new rule.

### First Rule

The initial production rule must not be `11`.

- For any PTS starting with `0 → 11`, the PTS that starts with string `11` instead will run for exactly one step less.

### Identical Rule

Each production rule must be different, including the empty rule.

### Reachable Rule

Do not create a new production rule if its input symbol does not appear in the previous rules.

## Deciders

A **decider** proves a program **does not halt**.

### Nondecreasing

A program is nonhating if every production rule length is at least 2.

### Consecutive Symbol

Each production rule *n* must not have the symbol *n* twice in a row.

- Otherwise, it is guaranteed that the rule will occur again, causing the system to never halt.

### Cycler

Check if the same string is visited twice.

### Even Index

If the first rule length is even, at least one of its even-indexed symbols must be nonzero.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Post Tag System](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
