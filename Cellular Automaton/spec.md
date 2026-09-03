# Cellular Automaton Specification

## Composition

- A bi-infinite **tape** (a sequence of symbols).
- A **code** consisting of a list of **symbols**. Its first symbol represents the total symbols count.

## Execution

- The automaton starts out with the **tape** consisting of a **sequence of all zeros** with the **middle cell** set to 1.
- At each step of the computation, based on its current **value**, each cell change its symbol according to its own symbol and the left cells. If every neighbor cells are zero, do not change the symbol.
- The automaton halts when an undefined rule is reached.

## Function

The function *BBCA(n,m)* is the largest number of steps that any *n*-symbol *m*-neighbors cellular automaton takes before halting.

The halting/undefined rule counts as a step, so the CA with rule `010 → 0` halts in 1 step.

## See Also

- [Pebble Automaton](https://wiki.bbchallenge.org/wiki/Pebble_Automaton)
