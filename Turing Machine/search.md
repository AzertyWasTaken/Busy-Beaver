# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Initial Transition

The initial transition must be `1RB`.

- For any TM starting with `A0 → 0RB`, the TM that starts in state `B` instead will run for exactly one step less. By iterating this process at most *n − 1* times, any *n*-state `A0 → 0RB` machine can be transformed into a corresponding `A0 → 1RB` machine with at most *n − 1* shorter runtime.

- Any TM starting with `A0 → 1LB` is symmetrical to the TM that starts with `A0 → 1RB` instead.

- For any TM starting with `A0 → 1RA`, the head gets stuck on state `A`, at the end of the tape. Hence it is nonhalting.

### Tree Normal Form

Enumerate all TMs by recursively expanding a "family tree" of machines:

- Start with a completely undefined TM of the desired size, this is the root node.
- For each unexplored node, run that TM on a blank tape until it reaches an undefined transition or times out.
- If you reach an undefined transition, then create children nodes from this node for each allowed transitions.
- Repeat this on every leaf node until all transitions but one are defined.

If a node with multiple undefined transitions is proven haltings, we must generate the next transition.

So TNF enumeration eliminates TMs with unused transitions.

### Maximum State and Symbol

The TM must not "skip" a state or a symbol during execution or TNF enumeration.

## Deciders

A **decider** proves a program **does not halt**.

### Halting Path

Check if the halting state is unreachable from any state by looking at the transitions table.

### Unused Symbol

Check if the halting symbol cannot appear by looking at the transitions table.

### Translated Cycler

We say a TM breaks a record when it visits a tape cell that was never visited before.

A TM is a translated cycler if it has two configurations that break a record in the same state such that the content of the tape at distance *L* from the record positions is the same in both record configurations.

Distance *L* is defined as being the maximum distance to record position 1 that was visited between the configuration of record 1 and record 2.

### Cycler

A TM is a cycler if two configurations are visited twice.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Tree Normal Form](https://wiki.bbchallenge.org/wiki/Tree_Normal_Form)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
