# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBPT(1) | = 1 | `0` |
| BBPT(2) | = 2 | `10` |
| BBPT(3) | = 4 | `011` |
| BBPT(4) | = 5 | `011_1` |
| BBPT(5) | ≥ 19 | `111_20` |
| BBPT(6) | ≥ 49 | `11_021_2` |
| BBPT(7) | ≥ 779 | `112_1_002` |
| BBPT(8) | ≥ 196,841 | `11220_1_10` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBPT(4) | 3 |
| BBPT(5) | 11 |
| BBPT(6) | 263 |
| BBPT(7) | 2,999 |
| BBPT(8) | 37,081 |

## BBPT(1)

The only program of this size is a busy beaver.

### Champion — `0`

- Runs a single step before halting.

## BBPT(2)

The only nonhalting program of this size is a cycler.

### Champion — `10`

- Runs for 2 steps before halting.

### Cycler — `00`

- The string never changes, causing the program to never halt.

## BBPT(3)

Proving this domain requires cycler decider.

### Champion — `011`

- Runs for 4 steps before halting.

### Translated Cycler — `000`

- The string grows indefinitely by a symbol per step.

### Multi-Period Cycler — `010`

- Has a **period** of 3 steps.

## BBPT(4)

Proving this domain requires multi-period cycler and consecutive symbols deciders.

### Champion — `011_1`

- Runs for 5 steps before halting.

### Chaotic — `010_0`

- Follows a chaotic pattern with growth phases followed by stable phases.

```txt
// Nonhalting proof
The ones are separated by at least 2 zeros, by repeatedly appending the first produciton rule.
So every one append is followed by a zero append.
Rule one decreases the string length by 1 while rule zero increases the string length by 1.
Hence every decrease is cancelled by the next increase.
```

## BBPT(5)

### Champion — `111_20`

- Runs for 19 steps before halting.
- Computes a collatz-like function.

```txt
// Function
start → F(3)
F(2n+1) → F(3n+2)
F(2n) → halt

// Trajectory
start → F(3) → F(5) → F(8) → halt

// Definition
F(n) := 1^n
```

### Multi-Period Translated Cycler — `01010`

- Has a **period** of 5 steps.
- Has an **offset** of 5 steps.

### Cubic Bell — `010_21`

- Each growth burst takes 2 more steps than the previous one.

### Chaotic 2 — `010_2_0`

- It is currently undecided.
- It is similar to the first one but seems to be much harder to decide.

### Bouncer — `0111_0`

- Follows a sawtooth-like pattern.

## BBPT(6)

### Champion — `11_021_2`

- Runs for 49 steps before halting.
- Has a chaotic behavior.

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
