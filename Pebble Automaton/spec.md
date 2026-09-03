# Pebble Automaton Specification

## Composition

- A bi-infinite **tape** (a sequence of symbols).
- A **code** consisting of a list of **rules**.
  - Each rule has a **left** and **right** arguments.
  - The **sum** of both arguments must be less than or equal to the argument index.

## Execution

- The automaton starts out with the **tape** consisting of a **sequence of all zeros** with the **middle cell** set to **the number of rules**.

- At each step of the computation, based on its current **value**, each cell chooses the parameters for the following actions:

  - **Move** a part of the value to the left.
  - **Move** a part of the value to the right.

- The automaton halts when every cells stop moving.

## Function

The function *peBBle(n)* is the largest number of steps that any *n*-rule pebble automaton takes before halting.

The halting/undefined transition counts as a step, so the PA with rule `1 → 00` halts in 1 step.

## See Also

- [Pebble Automaton](https://wiki.bbchallenge.org/wiki/Pebble_Automaton)
