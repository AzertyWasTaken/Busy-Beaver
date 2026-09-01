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

### Tree Normal Form

Enumerate all PTSs by recursively expanding a "family tree" of machines:

- Start with a completely undefined PTS of the desired size, this is the root node.
- For each unexplored node, run that PTS on a blank tape until it reaches an undefined symbol, reaches an undefined rule, halts or times out.
- If you reach an undefined rule, then enumerate every allowed length of production rule, with every symbol set to undefined (you may have to point from which rule and symbol the undefined symbol is from).
- If you reach an undefined symbol, then find from which rule it belongs and at which position, then enumerate every allowed symbols.
- Repeat this on every leaf node until the maximum size is reached.

If a node attent to execute an undefined symbol, we must generate the next symbols.

So TNF enumeration eliminates PTSs with unused transitions.

## Deciders

A **decider** proves a program **does not halt**.

### Nondecreasing

A program is nonhating if every production rule length is at least 2.

### Consecutive Symbol

Each production rule *n* must not have the symbol *n* twice in a row.

- Otherwise, it is guaranteed that the rule will occur again, causing the system to never halt.

### Even Index

If the first rule length is even, at least one of its even-indexed symbols must be nonzero.

We can generalize it by including the next rules and looking for loops.

### Cycler

Check if the same string is visited twice.

### Untitled TODO

- Check if every rules starts and ends with a zero.
- The first rule length must be greater or equal to 2.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Post Tag System](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
