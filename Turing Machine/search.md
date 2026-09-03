# Search

## Equivalence Rules

Rules that identify **structurally different programs** that behave the same.

### Tree Normal Form

Enumerate all TMs by recursively expanding a "family tree" of machines:

- Start with a completely undefined TM of the desired size, with `A0 → 1RB` already filled in: this is the root node.
- For each unexplored node, run that TM on a blank tape until it reaches an undefined instruction.
- If you reach an undefined instruction, create children nodes from this node for every allowed instruction: any write symbol already used or the next unused one, both moves, and any next state already visited or the next unvisited one.
- Repeat this on every leaf node.

A leaf node is finished when:

- The TM **halts**: every instruction was reached during execution, so the last undefined instruction is the one that halts it.
- The TM **times out**: it never reaches its remaining undefined instructions within the step limit.

If a TM halts while several instructions are still undefined, the tree keeps expanding: filling in the reached instruction may lead to TMs that use it and run longer.

Every instruction of a TNF machine is created when the machine first reaches it, so TNF enumeration never generates TMs with unused instructions. A TM with an unused instruction behaves the same for every choice of that instruction, so enumerating the machine without it is enough.

### Maximum State & Symbol

The first time a TM uses a new state or a new symbol, it must be exactly the next one: after state `B` and symbol `1`, the next new state can only be `C` and the next new symbol can only be `2`.

- Why: renaming the states and symbols to close the gaps gives a TM with the same behavior.
- In practice, TNF enumeration enforces this: children may only use symbols and states up to one past the highest used so far.

### Initial Instruction

The initial instruction must be `1RB`.

- **Write**: For any TM starting with `A0 → 0RB`, the first step rewrites `0` over `0` and moves onto a blank cell: it changes nothing.
The TM that starts in state `B` instead (state `A` removed) behaves the same and runs for exactly one step less.
By iterating this process at most *n − 1* times, any *n*-state `A0 → 0RB` machine can be transformed into a corresponding `A0 → 1RB` machine running at most *n − 1* steps less.
- **Move**: Any TM starting with `A0 → 1LB` is the mirror image of the TM that starts with `A0 → 1RB` instead: reflecting the tape (swapping left and right) maps one onto the other with the same runtime.
- **State**: For any TM starting with `A0 → 1RA`, the machine stays in state `A` and keeps moving right over blank cells: it repeats this instruction forever and never halts.

## Deciders

A **decider** proves a program **does not halt**.

### Instruction Table

Detect nonhalting behavior by looking at the instruction table alone, without simulating.

- **Halting Path**: Check if, from some state, every reachable state has all its instructions defined.
Once the machine enters such a state, whatever symbol it reads, it always finds a next instruction and moves to another such state: it can never reach an undefined instruction, so it never halts.
In TNF enumeration every state is visited, so it is enough that one such state exists.
- **Unused Symbol**: Check if every symbol is either readable in every state (all its instructions are defined) or can never appear on the tape.
A symbol whose instruction is undefined in every state halts the machine whenever it is read, so it must never be written; and a symbol that is never written can never appear, since the tape starts as all `0`s (and `A0` is always defined).

### Cycler

A TM is a cycler if it visits the same **configuration** twice. The machine is deterministic, so the second visit repeats the first visit's future forever: it is stuck in a cycle of **period** *p* steps and never halts.

The decider compares the current configuration against a saved one. To catch any period, it saves a snapshot at every power-of-two step count and compares it with the configuration at every even step.

Example: `1RB1RB_0LA---` (analyzed in `results.md`).

### Translated Cycler

A TM is a translated cycler if it repeats its behavior while shifting it across the tape: the same cycle plays again, **offset** by *d* cells and **period** *p* steps later. A cycler is the special case with offset 0.

We say a TM **breaks a record** when it visits a tape cell that was never visited before. The decider compares record configurations:

- If two records on the same side happen in the same state, and the tape content within distance *L* of the record position is the same in both configurations, then the machine cannot tell them apart.
- *L* is the farthest distance the head reached away from the record position between the two records: between two records the head never strays farther, so the cycle repeats shifted forever, breaking a new record each period. The machine never halts.

As in the cycler decider, records are saved at power-of-two step counts.

Example: `1RB0LA_0LA---` (analyzed in `results.md`).

### Bouncer TODO

The head bounces back and forth between the two ends of a string of ones.

- *Left movers*: states that move leftward on a string of ones, like `A1 → 1LA`.
- *Right movers*: states that move rightward on a string of ones, like `A1 → 1RA`.

When the tape is just a string of ones and the head leaves it at one end, check that it always returns to the string and exits at the opposite end, alternating between left movers and right movers: the TM bounces forever, so it never halts.

## Accelerated Simulation

Rules used to **speed up** halting (or not) programs execution.

Not implemented yet.

## See Also

- [Tree Normal Form](https://wiki.bbchallenge.org/wiki/Tree_Normal_Form)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
- [Bouncer](https://wiki.bbchallenge.org/wiki/Bouncer)
