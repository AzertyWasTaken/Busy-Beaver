# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBCT(1) | = 1 | `empty` |
| BBCT(2) | = 2 | `0` |
| BBCT(3) | = 3 | `00` |
| BBCT(4) | = 4 | `000` |
| BBCT(5) | ≥ 7 | `010_` |
| BBCT(6) | ≥ 8 | `010_0` |
| BBCT(7) | ≥ 13 | `0110__` |
| BBCT(8) | ≥ 28 | `101_10_` |
| BBCT(9) | ≥ 717 | `1011_00_` |
| BBCT(10) | ≥ 209 | `11_0_0100` |
| BBCT(11) | ≥ 2,269 | `1011_1_00_` |
| BBCT(12) | ≥ 6,328 | `0111__010_0` |
| BBCT(13) | ≥ 50,906 | `0011_010_1_0` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBCT(5) | 1 |
| BBCT(6) | 5 |
| BBCT(7) | 25 |
| BBCT(8) | 85 |
| BBCT(9) | 332 |
| BBCT(10) | 1,143 |
| BBCT(11) | 3,847 |
| BBCT(12) | 12,445 |
| BBCT(13) | 42,016 |

## BBCT(1)

The only program of this size is a busy beaver.

### Champion — `empty`

- Runs a single step before halting.

## BBCT(2)

The only nonhalting program of this size is a cycler.

### Champion — `0`

- Runs for 2 steps before halting.

### Cycler — `1`

- The string never changes, causing the program to never halt.

## BBCT(3)

Proving this domain requires nondecreasing decider.

### Champion — `00`

- Runs for 3 steps before halting.

### Multi-Period Cycler — `01`

- Has a **period** of 2 steps.

### Translated Cycler — `11`

- The string grows indefinitely by a symbol per step.

## BBCT(4)

### Champion — `000`

- Runs for 4 steps before halting.

### Multi-Period Translated Cycler — `011`

- Has a **period** of 3 steps.
- Has an **offset** of 3 steps.

## BBCT(5)

### Champion — `010_`

- Runs for 7 steps before halting.

### Translated Cycler 2 — `111_`

- Has a **period** of 2 steps.
- Has an **offset** of 2 steps.
- Cannot be decided by nondecreasing decider.

## BBCT(6)

### Champion — `010_0`

- Runs for 8 steps before halting.

### Chaotic — `111_0`

- Follows a chaotic pattern with waves.
- Is nonhalting.
