# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Maximum State and Symbol

The tag system must not "skip" a symbol during execution, for continuing a production rule or creating a new rule.

## Deciders

A **decider** proves a program **does not halt**.

### Consecutive Symbols

Each production rule $n$ must not have the symbol $n$ twice in a row.

- Otherwise, it is guaranteed that the rule will occur again, causing the system to never halt.

### Cycler

For uni-period cyclers, decide as nonhalting if a step do not change the string.

For multi-period cyclers, create an history of previous strings and decide as nonhalting if the same string appears at least twice.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Post Tag System](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
