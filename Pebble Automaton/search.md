# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Symmetry

The last rule **right** argument must be **greater or equal to** its **left** argument.

## Deciders

A **decider** proves a program **does not halt**.

### Halting Rule

At least one rule must be `00`.

### Shifting Rule

Both last rule arguments must not be equal to the **total rules count**.

### Cycler

Check if the same tape configuration is visited twice.

We can remove trailing zeros to detect cyclers with offsets.

### Trailing Glider TODO

Decide as nonhalting if there are any trailing gliders, since they cannot be stopped.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Pebble Automaton](https://wiki.bbchallenge.org/wiki/Pebble_Automaton)
