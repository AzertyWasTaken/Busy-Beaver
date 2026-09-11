# Fractran Specification

## Composition

- A **register** that has a finite number of counters. Each counter holds a nonnegative integer. Counters are named `0`, `1`, `2`, …, and a program has one counter per position used by its instructions.
- A **code** consisting of a sequence of **instructions**.

  - Each instruction is a sequence of integers, one per counter.

### Instruction Notation

The value at position `i` of an instruction acts on counter `i`:

- A **positive value** adds that amount to the counter.
- A **negative value** subtracts that amount from the counter.
- A **zero** leaves the counter unchanged.

An instruction **applies** when every counter it subtracts from holds at least the subtracted amount, so no counter can ever become negative.

For example, the instruction `A1` means: subtract 1 from counter `0`, then add 1 to counter `1`.

### Program Format

A program is written by concatenating its instructions in code order, and separating the instructions with `_`. Whitespace is ignored.

Each value is written as a single character: a digit `0`-`9` writes a nonnegative value, and a letter writes a negative value: `A` = -1, `B` = -2, …, `Z` = -26.

For example, `A1_0A` defines the instruction `A1` (subtract 1 from `0`, add 1 to `1`) followed by the instruction `0A` (subtract 1 from `1`).

## Execution

- The machine starts out with **counter `0` equal to 1** and **every other counter equal to 0**.

- At each step of the computation, the machine scans the code from the first instruction and applies the **first instruction that applies**: each value of the instruction is added to its counter (negative values subtract). The remaining instructions are skipped for this step and examined again at the next step.

- The machine halts when no instruction applies.

For example, the program `A1_0A` goes through the following values of the register:

```txt
start → [1,0] → [0,1] → [0,0] → halt
```

- Step 1: `A1` applies (counter `0` holds 1), so the register becomes `[0,1]`.
- Step 2: `A1` no longer applies, but `0A` does, so the register becomes `[0,0]`.
- Step 3: no instruction applies, so the machine halts after 2 steps.

## Function

The maximum step function *BBf(n)* is the largest number of steps that any Fractran program of size *n* takes before halting.

- The size of a program is the sum of the absolute values of all the integers in its code. For example, `A1_0A` has size 3.
- Each applied instruction counts as one step.
- The halting step does not count as a step, so `A` halts in 1 step.
- Programs in which some instruction always applies run forever and are not counted.

## See Also

- [Fractran](https://wiki.bbchallenge.org/wiki/Fractran)
