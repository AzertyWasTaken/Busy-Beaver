# Terminology

## Systems

- **System**: a computational model studied by the project (e.g. Turing Machine, Post Tag System).
- **Program**: an instance of a system (e.g. a Turing machine, a tag system).
- **Domain**: the set of programs of a given size in a system (e.g. `BB(2)`, `BBPT(4)`).

## Composition

- **Code**: the set of instructions that a program executes.
- **State**: a value that indicates the position of the code to be executed. A program has finitely many states.
- **Symbol**: a value that appears on a string. A program has finitely many symbols: its behavior may depend on the symbol it reads.
- **String**: a sequence of symbols.
- **Cell**: a position of a tape, holding one symbol.
- **Tape**: a string of cells that extends infinitely in both directions.
- **Head**: the pointer to the cell or rule being accessed.
- **Queue**: a string where symbols are appended at one end and removed at the opposite end.
- **Pebble**: a unit of value that can be moved between cells without gains or losses.

## Execution

- **Step**: the smallest unit of computation of a system.
- **Configuration**: full snapshot of a program's execution at a given step (e.g. tape content, head position, state, …).
- **Runtime**: the number of steps a program takes before halting.

## Search

- **Decide**: determine whether a program is halting or nonhalting.
- **Decider**: an algorithm that proves that some programs do not halt.
- **Holdout**: a program that is not decided yet: neither proven halting nor nonhalting.
- **Cryptid**: a holdout that is mathematically hard to decide.

## Results

- **Busy Beaver**: a halting program proven to have the largest runtime of its domain.
- **Busy Beaver function**: the largest runtime among the halting programs of a domain.
- **Champion**: a halting program with the largest known runtime of its domain.
