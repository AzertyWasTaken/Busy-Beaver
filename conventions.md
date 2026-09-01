# Conventions

## Size Metrics

- Do not count unnecessary stuff. If anything can be ignored without creating infinitely many non-equivalent programs, do not count it.
- The ratio between size and the actual length of the program must remain finite.

## Systems

- Every system must be Turing-complete.
- No unnecessary complexity. If a complex mechanic can be removed without affecting its Turing-completeness, remove it.
- The Busy Beaver function must count steps, not the final output.
- The halting step may be counted to prevent valid programs from having a runtime of 0.

## Specifications

- A `Composition` section listing the components of the system.
- An `Execution` section describing the initial configuration, the step rules and the halting condition.
- A `Function` section, when applicable, defining the Busy Beaver function for the system.
- A `See Also` section with links to relevant Busy Beaver Wiki pages.

## Results

- A `Champions` section with a table of champions and their running time.

- A `Holdouts` section with a table of current holdouts count.

- An `Analysis` section separated by domains.

  - A list of what deciders and programs are required to solve the value.
  - An analysis of the champion.
  - Analysis of other notable programs.

- A `See Also` section with links to relevant Busy Beaver Wiki pages.

## Search

- Must be a list of equivalence rules, deciders and accelerated simulations used to speed up enumeration, decide programs or speed up simulation.
- Do not include deciders that are strictly weaker than another one.
- Use 0-index system when describing item positions.
- May have deciders that are not implemented yet. They must be labeled as "TODO".
