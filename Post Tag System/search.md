# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Tree Normal Form

Enumerate all PTSs by recursively expanding a "family tree" of machines:

- Start with a PTS with no production rules: this is the root node.
- For each unexplored node, run that PTS on its initial queue until it reaches an undefined production rule, an undefined symbol, halts or times out.
- If you reach an undefined production rule, create children nodes for every allowed rule length: any length that fits in the remaining size, with every symbol of the new rule left undefined.
- If you reach an undefined symbol, create children nodes for every allowed symbol at that position: any symbol already used or the next unused one.
- Repeat this on every leaf node.

A leaf node is finished when:

- The PTS **halts**: every production rule was reached during execution, and every symbol left undefined is never read: filling it in would not change the behavior.
- The PTS **times out**: it never reaches its remaining undefined rules or symbols within the step limit. Only nodes that already use the full size are kept.

Every production rule of a TNF machine is created when the machine first reads its symbol, so TNF enumeration never generates PTSs with unused production rules.
A PTS with an unused production rule behaves the same for every choice of that rule, so enumerating the machine without it is enough.

### Maximum Symbol

The first time a PTS uses a new symbol — filling in an undefined symbol of a production rule, or creating the production rule of a symbol — it must be exactly the next one: after symbols `0` and `1`, the next new symbol can only be `2`.

- Why: renaming the symbols to close the gaps gives a PTS with the same behavior.
- In practice, TNF enumeration enforces this: production rules are created in the order their symbols are read, and a revealed symbol is at most one past the highest used so far.

### First Rule

The initial production rule must not be `11`.

- For any PTS starting with `0 → 11`, the first step only transforms the initial queue `00` into `11`: the PTS that starts with the queue `11` instead runs for exactly one step less.

### Identical Rule

Each production rule must be different, including the empty rule.

- Why: two symbols with the same production rule cannot be told apart — reading either appends the same word — so merging them into one symbol and dropping the duplicate rule gives a smaller PTS with the same runtime.

## Deciders

A **decider** proves a program **does not halt**.

### Nondecreasing

A PTS is nonhalting if every production rule is a sequence of at least two defined symbols.
Each step deletes two symbols and appends the read symbol's production rule, so the queue never shrinks: it starts with two symbols and always keeps at least two.

### Consecutive Symbol

The decider looks for a cycle of production rules where each rule contains two consecutive copies of the next rule's symbol: rule *n* contains `ss`, rule *s* contains `tt`, and so on, until some rule contains two consecutive copies of a symbol already in the chain.
The simplest case is a rule that contains two consecutive copies of its own symbol.

- Why: a pair of identical consecutive symbols in the queue stays adjacent until it reaches the front, where it is exactly the pair of symbols a step deletes; the step reads the pair's first symbol and appends that symbol's production rule, which contains the next pair of the chain.
From the first read of a chain symbol onward, the queue always contains one of the chain's pairs, so it keeps at least two symbols and the PTS never halts — except by reading an empty production rule, or before reading any symbol of the chain.

### Even Index

The decider checks that the first rule has even length and that every symbol appearing at an even index (0-indexed) of a checked rule is defined and has an even-length rule with all its even-indexed symbols defined.
Symbols already checked stop the recursion, so loops are allowed.

- Why: the head deletes two symbols per step, so the parity of a symbol's distance to the front of the queue never changes, and the queue length stays even: it starts at two symbols, and every rule of a checked symbol is even-length.
The symbols the PTS reads are therefore only the initial `0` and the even-indexed symbols of the rules of read symbols — exactly the symbols the decider checks.
An accepted PTS halts only by reading an empty production rule while exactly two symbols remain.

### Cycler

A PTS is a cycler if it visits the same queue twice. The PTS is deterministic, so the second visit repeats the first visit's future forever: it is stuck in a cycle of period *p* steps and never halts.

The decider compares the current queue against a saved one. To catch any period, it saves a snapshot at every power-of-two step count and compares it with the queue at every step.

Example: `00` (analyzed in `results.md`).

### Translated Cycler

The decider simulates a PTS. At each step, it checks if the queue is composed of the same pattern repeated twice. Is this is the case, consume the entire queue (execute as many steps as the half of the queue length). If after that the queue has a third instance of that pattern, decide as nonhalting.

### Zero Edge

Every production rule must start and end with `0`.

- Why: every rule is nonempty and ends with `0`, so the queue always ends with `0` and never becomes empty.
To halt, the queue must shrink to the single symbol `0`, which requires a two-symbol queue `a0` whose first symbol's rule is the single-symbol rule `0`.
Such a queue can only be produced by a step reading a symbol whose rule is `0` or `00`, and both cases force the first rule to be `0 → 0`.
A PTS with `0 → 0` halts on its very first step, so the simulation decides it already.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Tree Normal Form](https://wiki.bbchallenge.org/wiki/Tree_Normal_Form)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
