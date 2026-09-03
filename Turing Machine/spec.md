# Turing Machine Specification

## Composition

- A bi-infinite **tape** (a sequence of cells, infinite in both directions). Each cell holds one **symbol**: `0`, `1`, `2`, …

- A **state** (a single symbol): the machine is always in exactly one state, named `A`, `B`, `C`, …

- A **head** pointing at one of the tape cells.

- A **code** consisting of a table of **transitions** defined by **states** and **symbols**.

  - There is at most one transition per (state, symbol) pair.
  - Each transition has a **write**, **move** and **next state** parameter.
  - A transition may be **undefined** (left empty): reaching one halts the machine.

### Transition Notation

A transition is written `XY → WMD`, where:

- `X` is the current state and `Y` is the symbol read in the cell pointed by the head.
- `W` is the symbol to write, `M` is the move (`L` left or `R` right) and `D` is the next state.

For example, `A0 → 1RB` means: in state `A` reading a `0`, write `1`, move the head right and continue in state `B`.

An undefined transition is written `---`.

### Program Format

A program is written by concatenating the transitions of each state in symbol order, and separating the states with `_`. Whitespace is ignored.

For example, `1RB1LB_1LA---` defines `A0 → 1RB`, `A1 → 1LB`, `B0 → 1LA` and `B1 → ---`.

## Execution

- The machine starts out in state `A`, with the **head** on a starting cell and the **tape** consisting of a sequence of all zeros.

- At each step of the computation, the machine **reads** the symbol in the cell pointed by the **head**, and based on its current **state** and the **symbol** it read, it looks up the corresponding **transition** in the **code** and applies its parameters:

  - **Replace** the symbol it has read with the transition's **write** symbol.
  - **Move** the head one cell in the transition's **move** direction.
  - **Change** the state the machine is in to the transition's **next state**.

- The machine halts when the looked up transition is undefined.

## Function

The maximum step function *BB(n,m)* is the largest number of steps that any *n*-state *m*-symbol Turing machine takes before halting.

- The *n* states are named `A`, `B`, `C`, `D`, …
- The *m* symbols are named `0`, `1`, `2`, `3`, …
- Machines that never reach an undefined transition run forever and are not counted.

The halting/undefined transition counts as a step, so the TM with rule `A0 → ---` halts in 1 step.

## See Also

- [Turing Machine](https://wiki.bbchallenge.org/wiki/Turing_machine)
- [Busy Beaver Function](https://wiki.bbchallenge.org/wiki/Busy_Beaver_Functions)
