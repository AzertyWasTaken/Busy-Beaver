# Turing Machine Specification

## Composition

- A bi-infinite **tape** (a sequence of symbols).
- A **state** (a single symbol).
- A **head** pointing at one of the tape cells.
- A **code** consisting of a table of **transitions** defined by **states** and **symbols**.
  - Each transition has a **write**, **move** and **next state** parameter.

## Execution

- The machine starts out in state `A`, with the **tape** consisting of a **sequence of all zeros**.

- At each step of the computation, the machine **reads** the symbol at the **tape** pointed by the **head**, and based on its current **state** and the **symbol** it read, it chooses the parameters for the following actions:

  - **Replace** the **symbol** it has read with a possibly different one.
  - **Move** either **left** or **right**.
  - **Change** the **state** the machine is in.

- The machine halts when an undefined transition is reached.

## Function

The maximum step function BB(n,m) is the largest number of steps that any n-state m-symbol Turing machine takes before halting.

The halting/undefined transition counts as a step, so the TM with rule `A0 → ---` halts in 1 step.

## See Also

- [Turing Machine](https://wiki.bbchallenge.org/wiki/Turing_machine)
- [Busy Beaver Function](https://wiki.bbchallenge.org/wiki/Busy_Beaver_Functions)
