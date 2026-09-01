# README

![Status](https://img.shields.io/badge/Status-Active-informational)
![Language](https://img.shields.io/badge/Language-JavaScript-purple)

This project studies the Busy Beaver function for various computational models.

If you find any interesting information here, you can add it to the [Busy Beaver wiki](https://wiki.bbchallenge.org/wiki/Main_Page).

## Goals

- **Explore** various computational systems.
- **Enumerate** all programs up to a given length.
- **Decide holdouts** (prove they are halting or nonhalting).
- **Find new champions** (longest-halting programs).
- **Find cryptids** (mathematically hard to decide).
- **Document** results and findings.

## Systems

- [Turing Machine](./Turing%20Machine/)
- [Post Tag System](./Post%20Tag%20System/)
- [Cyclic Tag System](./Cyclic%20Tag%20System/)

Each system folder contains:

- `spec.md` — the system definition: composition, execution and step counting.
- `search.md` — the equivalence rules, deciders and accelerated simulations used for the search.
- `results.md` — the champions, holdouts and analysis for each domain.
- `TODO.md` — the remaining work for this system.
- `main.js` — the entry point for enumeration and deciding holdouts.

## Getting Started

- Install [Node.js](https://nodejs.org/) (v22 or later).
- Open the system of your choice.
- Open the `main.js` script.
- Configure the `newList` or `decideList` function.
- Run the script with `node main.js`.

## Documentation

- [Conventions](./conventions.md) — size metrics, systems, results and search conventions.
- [Stats](./stats.md) — BB-index and active code size per system.
- [TODO](./TODO.md) — planned systems and global tasks.
- [Contributing](./CONTRIBUTING.md) — how to contribute.
