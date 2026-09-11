# Counterscript Specification

## Composition

- A **register** that has a finite number of counters. Each counter holds a nonnegative integer.
- A **code** consisting of a sequence of **instructions**. There are three types of instructions: **increments**, **decrements** and **while-loops**.

### Instruction Notation

Each instruction is written with the name of the counter it acts on. Counters are named `A`, `B`, `C`, …

- An **increment** is written `+A`: it adds 1 to `A`.
- A **decrement** is written `-A`: it subtracts 1 from `A` if `A > 0`.
- A **while-loop** is written `wA{ ... }`: it repeats the instructions between the braces while `A > 0`. Loops may be nested.

For example, `wA{A-_+B_+B}` means: **while** `A > 0`, **decrement** `A` once and **increment** `B` twice.

### Program Format

A program is written by writing its instructions in execution order, and separating the instructions with `_`. Whitespaces are ignored. Braces already delimit instructions, so no separator is needed around them.

An undefined instruction is written `#`: a run that reaches one stops without halting.

For example, `+A_+A_wA{-A_+B}` defines `+A`, `+A` and the while-loop `wA{-A_+B}`.

## Execution

- The program starts out with **every counter equal to 0**, and **execution** begins at the first instruction. Instructions are then executed one by one:

  - **Increment**: add 1 to the counter, then go to the next instruction.
  - **Decrement**: subtract 1 from the counter if it is greater than 0, otherwise leave it unchanged. Either way, go to the next instruction, so a counter can never become negative.
  - **While-loop**: if the counter equals 0, skip to the instruction after the closing brace. Otherwise, execute the loop body from its first instruction, then check the counter again.

- The program halts when execution runs past the last instruction.

For example, the program `+A_+A_wA{-A_+B}` goes through the following values of `A` and `B`:

```txt
start → [0,0] → [1,0] → [2,0] →
[1,0] → [1,1] → [0,1] → [0,2] → halt
```

## Function

The maximum step function *BBCS(n)* is the largest number of steps that any *n*-instructions CounterScript program takes before halting.

- The *n* instructions are counted with a whole while-loop as a single instruction: `+A_+A_+A_wA{-A}` has 5 instructions.
- Each executed increment or decrement counts as one step, so `+A` halts in 1 step and `+A_+A_+A_wA{-A}` halts in 6 steps.
- Programs that never halt run forever and are not counted.

## See Also

- [CounterScript](https://wiki.bbchallenge.org/wiki/CounterScript)
