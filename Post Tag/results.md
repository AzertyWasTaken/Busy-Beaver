# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBPT(1) | = 1 | `0` |
| BBPT(2) | = 2 | `10` |
| BBPT(3) | = 4 | `011` |
| BBPT(4) | ≥ 5 | `011_1` |
| BBPT(5) | ≥ 19 | `111_20` |
| BBPT(6) | ≥ 49 | `11_021_2` |
| BBPT(7) | ≥ 779 | `112_1_002` |
| BBPT(8) | ≥ 196,841 | `11220_1_10` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBPT(4) | 3 |
| BBPT(5) | 37 |
| BBPT(6) | 556 |
| BBPT(7) | 6,882 |
| BBPT(8) | 81,715 |

## BBPT(1)

### Champion — `0`

- Runs a single step before halting.

## BBPT(2)

### Cycler — `00`

- The string never changes, causing the program to never halt.

### Champion — `10`

- Runs for 2 steps before halting.
- Sets the first symbol to one then erases the whole string.

## BBPT(3)

### Multi-Period Cycler — `010`

- Cycles every 3 steps.

### Champion — `011`

- Runs for 4 steps before halting.
- Sets even (0-indexed) symbols to one then erases the whole string.

## BBPT(4)

### Translated Cycler — `0101`

- Grows by 2 symbols at each step.

### Chaotic — `010_0`

- Is currently undecided.
- Have growth phases followed by stable phases.

### Champion — `011_1`

- Runs for 5 steps before halting.
- Sets even 0-indexed symbols to one then erases the whole string.

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

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
