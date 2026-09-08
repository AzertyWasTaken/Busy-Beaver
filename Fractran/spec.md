# Fractran Specification

## Composition

- A **register** that has a finite number of counters. Each counter holds a nonnegative integer.
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

- The program starts out with the first counter set to 1 and the others to 0.
- At each step of the computation, the program looks up the correct **instruction** (the first intruction that does not make any counter negative) in the **code** and change each counter according to the rules:
- The program halts when no transition can be applied.

## Function

The maximum step function *BBf(n)* is the largest number of steps that any *n*-instructions fractran program takes before halting.

- programs that never reach an undefined transition run forever and are not counted.

## See Also

- [Fractran](https://wiki.bbchallenge.org/wiki/Fractran)
