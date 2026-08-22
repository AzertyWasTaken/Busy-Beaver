# Turing Machine Specification

- The machines use a single tape — a bi-infinite sequence of symbols (labeled as integers) which gets locally modified during execution.
- The configuration of the machine at each step of the computation consists of the symbols on the tape, the tape head pointing at one of the tape positions, and a choice of one of the *n* states (labeled with the first *n* capital letters of the alphabet).
- The machine starts out in state `A`, with the tape consisting of a sequence of all zeros.
- At each step of the computation, the machine reads the symbol at the tape head, and based on its current state and the symbol it read, it chooses the parameters for the following actions:
  - Replace the symbol it has read with a possibly different one;
  - Move either left or right;
  - Change the state the machine is in.
- Each of the (current state, read symbol) pairs may also correspond to a halting transition (denoted `Z`), in which case the computation stops when the transition is reached.

## See Also

- [Turing machine](https://wiki.bbchallenge.org/wiki/Turing_machine)
