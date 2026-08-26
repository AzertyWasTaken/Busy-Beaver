# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Initial Transition

The initial transition must be `1RB`.

- For any TM starting with `A0 → 0RB`, the TM that starts in state `B` instead will run for exactly one step less. By iterating this process at most $n−1$ times, any $n$-state `A0 → 0RB` machine can be transformed into a corresponding `A0 → 1RB` machine with at most $n−1$ shorter runtime.

- Any TM starting with `A0 → 1LB` is symmetrical to the TM that starts with `A0 → 1RB` instead.

- For any TM starting with `A0 → 1RA`, the head gets stuck on state `A`, at the end of the tape. Hence it is nonhalting.

### Tree Normal Form

Enumerate all TMs by recursively expanding a "family tree" of machines:

- Start with a completely undefined TM of the desired size, this is the root node.
- For each unexplored node, run that TM on a blank tape until it reaches an undefined transition or times out.
- If you reach an undefined transition, then create children nodes from this node for each allowed transitions.
- Repeat this on every leaf node until all transitions but one are defined.

It prevents enumerating TMs with unused transitions.

### Maximum State and Symbol

The TM must not "skip" a state or a symbol during execution.

## Deciders

A **decider** proves a program **does not halt**.

### Spin Out

- When a TM visits a tape cell that was never visited before, it always read a zero.
- If the next instruction make the TM move in the same direction while staying in the same state, decide as **nonhalting**.

### Cycler

For uni-period cyclers, decide as nonhalting if two steps do not change the tape, head position and state.

For multi-period cyclers, create an history of previous configurations and decide as nonhalting if the same configuration appears at least twice.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Tree Normal Form](https://wiki.bbchallenge.org/wiki/Tree_Normal_Form)
