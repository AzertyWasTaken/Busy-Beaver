# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Tree Normal Form

Programs are built instruction by instruction instead of enumerating every possible program, and only one representative of each behavior is kept.

After each completed instruction, the program is run for the maximum step count of the domain:

- If the program halts, the next instruction is added after it: an instruction is only applied once the previous ones cannot be applied, so it can make the program run longer.
- If the program is still running after that many steps, it is returned as a **holdout**, and the deciders decide whether it halts.

No halting program is missed: removing the last instructions of a program can only make it halt earlier, so the prefixes of a halting program halt too. An instruction with no negative values is never enumerated: it always applies, so a program that contains one never halts.

### Null Values

Set every new positive value to null. When a null value is added to any value, it becomes null. When a value equal to null is checked, the program pauses and the enumerate every possible values for the null value.

### Maximum Value

A value can never be bigger than the size that is left, so a program of size *n* never adds or subtracts more than *n* in one instruction.

### New Counters

A `0` may be written only in a counter that the code already uses, and an instruction can never end with a `0` since a missing value is already a zero.

The first instruction is the exception and may start with a `0`, as in `0A`: counter `0` starts at 1 while every other counter starts at 0, so counter `0` cannot be permutated with them.

### Ordered New Counters

Two counters that start at 0 and that no earlier instruction tells apart (they hold the same value at both positions) are interchangeable: swapping them changes nothing, so one of the two orders can be discarded by keeping the new value greater or equal to the value of the counter before it.

The values of the first instruction, starting with the 2nd, are therefore ordered from the least to the most: `A12` is enumerated, while `A21` and `12A` are not, since they are equivalent to `A12` and `1A2`.

The rule applies to the later instructions too: `1AA_A21` is equivalent to `1AA_A12`, and `1AA_A12` is the one enumerated.

Counter `0` is never interchangeable with the others, since it starts at 1 while the others start at 0, so the value of counter `1` is not ordered against it: `1A2` and `2A1` are both enumerated.

### Row Requirement Subset

An instruction is only applied when all the earlier ones do not apply. So an instruction whose requirement is at least as strict as an earlier instruction's is dead code: `11A_1AA` is invalid because a register that satisfies the 2nd instruction (counter `1` ≥ 1 and counter `2` ≥ 1) also satisfies the 1st (counter `2` ≥ 1), which is scanned first.

## Deciders

A **decider** proves a program **does not halt**.

### Translated Cycler

A **cycler** repeats the same register forever, so it never halts. It is a translated cycler with no offset: `A1_1A` goes `[1,0] → [0,1] → [1,0] → [0,1]`, a cycle of 2 steps.

A **translated cycler** repeats the same cycle while its counters keep growing, so it never halts either: `1A_A2` goes `[1,0] → [0,2] → [1,1] → [2,0] → [1,2] → [2,1] → [3,0] → …`, a cycle of 3 steps that adds 1 to counter `0`.

The decider simulates the program and saves the register after 2, 4, 8, … steps, so that cycles of any period are detected. The current register is compared with the saved one, and the program is decided as nonhalting when:

- the current value of every counter is at least the saved one, and
- the counters that have reached 0 in between hold exactly the saved value.

A counter reaching 0 is what makes an instruction stop applying, so a register that meets both conditions cannot be told apart from the saved one and the program repeats the same cycle forever. A program that halts during the simulation is decided as halting.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Tree Normal Form](https://wiki.bbchallenge.org/wiki/Tree_Normal_Form)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
