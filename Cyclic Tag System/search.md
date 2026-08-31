# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### First Rule

The initial production rule must not be `1`.

- For any CTS starting with `0 → 1`, the string stays the same after the first step, so the CTS is equivalent to the version where the rules cycle is shifter 1 step backward.

## Deciders

A **decider** proves a program **does not halt**.

### Nondecreasing

A program is nonhating if every production rule length has a 1.

### Cycler

Check if the same string is visited twice.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.
