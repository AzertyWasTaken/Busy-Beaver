# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBCT(1) | = 1 | `empty` |
| BBCT(2) | = 2 | `0` |
| BBCT(3) | = 3 | `00` |
| BBCT(4) | = 4 | `000` |
| BBCT(5) | = 7 | `010_` |
| BBCT(6) | = 8 | `010_0` |
| BBCT(7) | = 13 | `0110__` |
| BBCT(8) | ≥ 28 | `101_10_` |
| BBCT(9) | ≥ 717 | `1011_00_` |
| BBCT(10) | ≥ 209 | `11_0_0100` |
| BBCT(11) | ≥ 2,269 | `1011_1_00_` |
| BBCT(12) | ≥ 6,328 | `0111__010_0` |
| BBCT(13) | ≥ 50,906 | `0011_010_1_0` |
| BBCT(14) | ≥ 1,000 | `001110_00_1_0` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBCT(8) | 1 |
| BBCT(9) | 17 |
| BBCT(10) | 133 |
| BBCT(11) | 751 |
| BBCT(12) | 3,453 |
| BBCT(13) | 14,539 |
| BBCT(14) | 52,873 |

## BBCT(1)

The only program of this size is a busy beaver.

### Busy Beaver — `empty`

- Runs a single step before halting.

```txt
// Simulation
start → 1 → halt
```

## BBCT(2)

The only nonhalting program of this size is a cycler.

### Busy Beaver — `0`

- Runs for 2 steps before halting.

```txt
// Simulation
start → 1 → 0 → halt
```

### Cycler — `1`

- The string never changes, causing the program to never halt.

## BBCT(3)

Proving this domain requires nondecreasing decider.

### Busy Beaver — `00`

- Runs for 3 steps before halting.

```txt
// Simulation
start → 1 → 00 → 0 → halt
```

### Multi-Period Cycler — `01`

- Has a **period** of 2 steps.

### Translated Cycler — `11`

- The string grows indefinitely by a symbol per step.

## BBCT(4)

### Busy Beaver — `000`

- Runs for 4 steps before halting.

```txt
// Simulation
start → 1 → 000 → 00 → 0 → halt
```

### Multi-Period Translated Cycler — `011`

- Has a **period** of 3 steps.
- Has an **offset** of 3 steps.

## BBCT(5)

### Busy Beaver — `010_`

- Runs for 7 steps before halting.

```txt
// Simulation
start → 1 → 010 → 10 → 0010 → 010 → 10 → 0 → halt
```

### Translated Cycler 2 — `111_`

- Has a **period** of 2 steps.
- Has an **offset** of 2 steps.
- Cannot be decided by nondecreasing decider.

## BBCT(6)

### Busy Beaver — `010_0`

- Runs for 8 steps before halting.

```txt
// Simulation
start → 1 → 010 → 10 → 0010 → 010 → 10 → 00 → 0 → halt
```

### Chaotic — `111_0`

- Follows a chaotic pattern.
- Can be decided as nonhalting with consecutive ones decider.

## BBCT(7)

### Busy Beaver — `0110__`

- Runs for 13 steps before halting.
- Repeat the first rule thrice. Shift the ones at each iteration so at the 3rd iteration, both ones are skipped.

## BBCT(8)

### Champion — `101_10_`

- Runs for 28 steps before halting.
- Follows a chaotic pattern.

### Chaotic 2 — `011__11`

- Follows a chaotic pattern.
- Cannot be decided with consecutive ones decider.

Other: `1011_1_` `101_11_`

### Cubic Bell — `11_11_0`

TODO

## BBCT(9)

### Champion — `1011_00_`

- Runs for 717 steps before halting.
- Follows a chaotic pattern.

### Long-Period Translated Cycler — `0101010_`

TODO

### Long-Period Cycler — `00110__1`

TODO

### Irregular Translated Cycler — `010__011`

TODO

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Cyclic_Tag)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
