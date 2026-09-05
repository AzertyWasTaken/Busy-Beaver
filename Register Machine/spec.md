# Register Machine Specification

## Composition

- A **register** that has a finite number of counters. Each counter holds a nonnegative integer.
- A **state** (a single symbol): the machine is always in exactly one state, named `A`, `B`, `C`, …
- A **code** consisting of a sequence of **instructions**. There are two types of instructions: **increments** and **decrements**.

### Instruction Notation

An instruction is written `X → CTD`, where:

- `X` is the current state.
- `C` is the selected counter, `T` is the type of instruction (`+` increment or `-` decrement) and `D` is the next state.

For example, `A → 1+` means: in state `A`, increment `1` then go to next instruction.

An undefined transition is skipped.

### Program Format

A program is written by concatenating the transitions of each state in symbol order, and separating the states with `_`. Whitespace is ignored.

For example, `1RB1LB_1LA---` defines `A0 → 1RB`, `A1 → 1LB`, `B0 → 1LA` and `B1 → ---`.

## Execution

- The machine starts out in state `A`, with the **head** on a starting cell and the **tape** consisting of a sequence of all zeros.

- At each step of the computation, based on its current **state**, the machine looks up the corresponding **instruction** in the **code** and applies its parameters:

  - **Increment**: Increment counter `0` by one then go to next instruction.
  - **Decrement**: If the counter `0` equals 0, go to the next state. Otherwise, decrement `0` by one.

- The machine halts when the looked up transition is undefined.

## Function

The maximum step function *BBR(n)* is the largest number of steps that any *n*-instructions register machine takes before halting.

- The *n* states are named `A`, `B`, `C`, `D`, …
- Machines that never reach an undefined transition run forever and are not counted.

## See Also

- [Register Machine](https://wiki.bbchallenge.org/wiki/Register_machine)
