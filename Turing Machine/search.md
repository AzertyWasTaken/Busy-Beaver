# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Initial Transition

The initial transition must be `1RB`.

- For any TM starting with `A0 → 0RB`, the TM that starts in state `B` instead will run for exactly one step less. By iterating this process at most *n − 1* times, any *n*-state `A0 → 0RB` machine can be transformed into a corresponding `A0 → 1RB` machine with at most *n − 1* shorter runtime.

- Any TM starting with `A0 → 1LB` is symmetrical to the TM that starts with `A0 → 1RB` instead.

- For any TM starting with `A0 → 1RA`, the head gets stuck on state `A`, at the end of the tape. Hence it is nonhalting.

## Deciders

A **decider** proves a program **does not halt**.

Not implemented yet.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.
