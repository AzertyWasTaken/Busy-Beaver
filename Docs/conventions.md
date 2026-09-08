# Conventions

Conventions for the documentation of each system (`spec.md`, `search.md`, `results.md`) and for the website.

## Size Metrics

- The size of a program counts only components that can affect the computation. A component may be ignored (not counted) only if ignoring it never merges two programs with different behaviors; in particular, unused states, symbols or rules do not count.
- There must be a finite number of nonequivalent programs for each size.
- The size must stay proportional to the length of the program's encoding: the ratio between the size and the encoding length must remain finite, so the metric cannot be gamed by compressed or padded encodings.

## Systems

- Every system must be Turing-complete.
- No unnecessary complexity. If a mechanic can be removed without affecting Turing-completeness, remove it.
- The Busy Beaver function counts steps, not the final output.
- The halting step may be counted, so that every halting program has a runtime of at least 1. Each spec must state whether it counts.

## Specifications

Each `spec.md` contains:

- A `Composition` section listing the components of the system.
- An `Execution` section describing the initial configuration, the step rules and the halting condition.
- A `Function` section, when applicable, defining the Busy Beaver function for the system: its size parameter, what counts as a step, and whether the halting step counts.
- A `See Also` section with links to relevant Busy Beaver Wiki pages.

## Results

Each `results.md` contains:

- A `Champions` section with a table of champions per domain: the domain, its running time (exact value or lower bound) and the champion program in the system's program format.
- A `Holdouts` section with a table of the number of holdouts (undecided programs: neither proven halting nor nonhalting) per domain.
- An `Analysis` section with one subsection per domain, containing:
  - The deciders and programs required to solve the domain's value.
  - An analysis of the champion.
  - An analysis of other notable programs: programs that may require manual analysis or the creation of a new decider to decide.
- A `See Also` section with links to relevant Busy Beaver Wiki pages.

## Search

Each `search.md` lists the techniques used during the search, in three sections:

- `Equivalence Rules` — rules identifying structurally different programs that behave the same, used to prune enumeration.
- `Deciders` — procedures proving that programs do not halt.
- `Accelerated Simulation` — rules used to speed up the execution of programs.

Additional rules:

- Each decider must include a high-level explanation of how its algorithm works and why it is correct.
- Positions are 0-indexed when describing items: the first item is at index 0.
- Deciders that are not implemented yet must be labeled `TODO`.
- If a decider is strictly weaker than another one (it decides a strict subset of the programs the stronger one decides), its description is moved to the beginning of the stronger decider's section, to introduce it.
- For each section, order deciders from strongest to weakest.

## Website

- Simulator pages must import the parser and runner of their system folder, so the simulators match the research code.
- The website is served from the repository root, so pages must import modules with relative paths.
- No external dependencies or frameworks.
