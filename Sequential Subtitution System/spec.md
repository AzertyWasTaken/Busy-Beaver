# Sequential Substitution System Specification

## Composition

- A **string** of **symbols**: `0`, `1`, `2`, …

- A **code** consisting of an ordered list of **rules**.

  - A rule has an **input** and an **output**, both sequences of symbols.
  - The input is never empty.

### Program Format

A program is written by writing the rules in order, and separating the rules with `_`. Inside a rule, the input and the output are separated by `>`. Each symbol is written as its name: `0`, `1`, `2`, … Whitespaces are ignored.

An empty output is written as nothing, so `0>1_1>` defines the rules `0 → 1` and `1 → empty`, and `0>111_1>2_2>` defines the rules `0 → 111`, `1 → 2` and `2 → empty`.

The string is not written anywhere: it starts out as `0` and is rewritten during execution.

## Execution

- The system starts out with **string** equal to `0`.

- At each step of the computation, the system:

  - **searches** the rules in order, and takes the first rule whose **input** appears in the **string** as a consecutive sequence of symbols.
  - **replaces** the leftmost occurrence of that input by the rule's **output**.
  - **leaves** the rest of the **string** untouched.

- The system halts when no rule's input appears in the **string**.
  The search that finds no rule is not a step, so the runtime is the number of replacements the system performs.

The rules are tried in order: a rule never runs while an earlier rule matches, and the rules written after the first match are ignored during that step. The string may grow, shrink or stay the same at every step.

For example, the program `0>111_1>2_2>` runs as:

```txt
// Simulation
start → 0 → 111 → 211 → 221 → 222 → 22 → 2 → (empty) → halt
```

## Function

The function *BBSS(n)* is the largest number of steps that any sequential substitution system of size *n* takes before halting.

- The size of a sequential substitution system is the total number of symbols in its rules: every symbol of every input and every output counts. For example, `0>111_1>2_2>` has size 1 (`0`) + 3 (`111`) + 1 (`1`) + 1 (`2`) + 1 (`2`) = 7.
- Sequential substitution systems that never halt are not counted.
- Each step replaces one occurrence of one rule's input.
- The halting step is not counted: the runtime is the number of replacements, so a system whose rules never match the initial `0` halts in 0 steps (for example `1>`).

## See Also

- [Busy Beaver Function](https://wiki.bbchallenge.org/wiki/Busy_Beaver_Functions)
