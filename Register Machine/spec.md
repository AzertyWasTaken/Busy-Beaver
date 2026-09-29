# Register Machine Specification

## Composition

- A **register** that has a finite number of **counters**. Each counter holds a nonnegative integer. Counters are named after their position: `0`, `1`, `2`, …

- A **state** (a single symbol): the machine is always in exactly one state, named `A`, `B`, `C`, … The halt state is named `*`.

- A **code** consisting of one **instruction** per state, written in state order. There are two types of instructions: **increments** and **decrements**.

### Instruction Notation

An instruction is written `TCD`, where:

- `T` is the instruction type: `+` increment or `-` decrement.
- `C` is the selected counter.
- `D` is the next state.

A decrement is written `TCDE`, with a second next state `E`: it goes to `D` after decrementing counter `C`, and goes to `E` when counter `C` holds 0.

For example, `+0B` means: in the current state, increment counter `0` then continue in state `B`. `-1FC` means: in the current state, decrement counter `1` then continue in state `F`, but continue in state `C` if counter `1` holds 0.

### Program Format

A program is written by concatenating the instructions of its states in state order, and separating the states with `_`. Whitespace is ignored.

A state left empty (nothing between two separators) has no instruction, just like the halt state.

For example, `+0B_-0B*` defines `A: +0B` and `B: -0B*`, and `+0B_+0C_` defines `A: +0B`, `B: +0C` and leaves state `C` empty, so it halts after 2 steps.

## Execution

- The machine starts out in state `A`, with every counter equal to 0.

- At each step of the computation, based on its current **state**, the machine looks up the corresponding **instruction** in the **code** and applies its parameters:

  - **Increment**: Increment counter `C` by one then go to state `D`.
  - **Decrement**: If counter `C` holds 0, go to state `E`. Otherwise, decrement counter `C` by one then go to state `D`.

- The machine halts when it looks up an instruction in a state that has none.

## Function

The maximum step function *MBB(n)* is the largest number of steps that any *n*-instruction register machine takes before halting.

- The size of a program is its number of instructions: one instruction per state, named `A`, `B`, `C`, `D`, …
- The counters are not counted: an instruction selects one counter and new counters are created in order, so a program of size *n* uses at most *n* counters.
- An instruction that the run never reaches does not count, since it cannot affect the computation.
- Each step applies one instruction.
- The halting step does not count as a step: the state it reaches holds no instruction to apply, so the machine `+0*` halts in 1 step.
- Machines that never halt are not counted.

## See Also

- [Register Machine](https://wiki.bbchallenge.org/wiki/Register_machine)
