# Register Machine Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Tree Normal Form

The search grows a "family tree" of programs instead of generating every program of a size at once:

- Start with a code with no instructions: this is the root node.
- Run the program written so far until it reaches a state without an instruction.
- Complete the instruction of that state for every allowed choice: the counter is either one already used or the next unused one, and the next state is either one already used, the next unused one, or the halt state `*`.
- Repeat on every node.

A node is finished when:

- The code holds one instruction per state: the program is complete.
- The program **times out**: it never reaches another state without an instruction within the step limit.

A program that times out is kept as it is instead of being extended: it never reaches its empty states within the step limit, so filling them can only change what the run does after the step limit. Its extensions are left out, so a holdout file of a domain also holds programs that use fewer instructions than the domain's size.

An instruction is created when the run first reaches its state, so no enumerated program has an instruction that the run never reaches.

### Maximum Counter

A counter that is used for the first time is always the next unused one: the first instruction can only select counter `0`, and a new counter after the used ones can only be the next one.

- Why: counters are only names, and an instruction only compares the counter it selects to 0, so renaming the counters of a program to close the gaps between them gives a program with the same behavior.

### Maximum State

A state that is used for the first time is always the next unused one: the first instruction can only go to the next unused state `B` or to the halt state `*`, and every later new state can only be the next unused one.

- Why: states are only names, and the run only depends on the instruction each state holds, so renaming the states of a program to close the gaps between them gives a program with the same behavior.
- The two next states of a decrement are created in the order they are written.

### Single Halt Reference

At most one instruction references the halt state `*`.

- Why: taking a reference to the halt state halts the machine, so at most one reference is ever taken. Every other reference can point to a state of the program instead, which changes nothing since it is never taken.
- The search only offers the halt state while no instruction references it yet.

## Deciders

A **decider** proves a program **does not halt**.

### Halting Path

A complete program that never references the halt state never halts, so the search skips it.

- Why: every state holds an instruction and every instruction goes to a state of the program, so the machine always finds an instruction to apply: it never reaches a state without an instruction.

### Translated Cycler

A **cycler** repeats the same state and register forever, so it never halts: `+0B_-0A*` goes `A[0] → B[1] → A[0] → B[1]`, a cycle of 2 steps.

A **translated cycler** repeats the same cycle while its counters keep growing, so it never halts either: `-0*B_+0B` goes `A[0] → B[0] → B[1] → B[2] → …`, increasing counter `0` at every step. A cycler is the special case where the counters do not grow.

The decider simulates the program and saves the state and register after 2, 4, 8, … steps, so that cycles of any period are detected. The current configuration is compared with the saved one, and the program is decided as nonhalting when:

- the machine is back in the saved state, and
- the current value of every counter is at least the saved one, except for the counters that have reached 0 in between, which hold exactly the saved value.

A counter reaching 0 is what makes a decrement take its second next state, so a configuration that meets both conditions cannot be told apart from the saved one: the program repeats the same cycle forever. A program that halts during the simulation is decided as halting.

Examples: the cycler `+0B_-0A*` and the translated cycler `-0*B_+0B` (analyzed in `results.md`).

### Bouncer TODO

A bouncer counts a counter up to the value of another one, then counts that other one up while the counter goes back to 0, so every cycle starts from a larger value: the register never repeats and the program never halts.

No bouncer decider is implemented yet, and the holdouts of MBB(5) and MBB(6) are bouncers, like `+0B_-1*C_-2AD_+2E_-0DA`, which bounces on counter `2` and increases it by two at every cycle (analyzed in `results.md`).

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Tree Normal Form](https://wiki.bbchallenge.org/wiki/Tree_Normal_Form)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
- [Bouncer](https://wiki.bbchallenge.org/wiki/Bouncer)
