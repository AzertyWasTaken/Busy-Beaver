# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| peBBle(1) | = 1 | `00` |
| peBBle(2) | = 2 | `00_01` |
| peBBle(3) | = 4 | `00_01_01` |
| peBBle(4) | = 7 | `00_01_20_03` |
| peBBle(5) | ≥ 12 | `00_11_03_21_04` |
| peBBle(6) | ≥ 18 | `00_11_03_21_32_11` |

## Holdouts

| Domain | Holdouts |
| - | - |
| peBBle(4) | 8 |
| peBBle(5) | 320 |
| peBBle(6) | 5,211 |

## peBBle(1)

Solving this value requires to decide `01`.

### Champion — `00`

The pebble never moves.

### Cycler — `01`

The pebble moves rightward forever.

## peBBle(2)

Solving this value requires shifting rule and halting rule deciders.

### Champion — `00_01`

Moves a pebble rightward before halting.

## peBBle(3)

### Champion — `00_01_01`

Halts in 4 steps.

### Translated Cycler — `00_02_12`

- Leaves a static pebble.

### Multi-Period Cycler — `00_20_12`

- Has a **period** of 3 steps.
- Has an **offset** of 1 cell.

## peBBle(4)

### Champion — `00_01_20_03`

Halts in 7 steps.

### Multi-Period Translated Cycler — `00_02_01_03`

- Has a **period** of 2.
- Leaves a static pebble.

## peBBle(5)

### Champion — `00_11_03_21_04`

- Halts in 12 steps.
- Follows a chaotic pattern.

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Pebble_Automaton)
