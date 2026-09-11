# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBf(1) | = 1 | `A` |
| BBf(2) | = 1 | `A1` |
| BBf(3) | = 2 | `A1_0A` |
| BBf(4) | = 3 | `A2_0A` |
| BBf(5) | = 4 | `A3_0A` |
| BBf(6) | = 5 | `A4_0A` |
| BBf(7) | = 7 | `A2_0A2_00A` |
| BBf(8) | = 10 | `A3_0A2_00A` |
| BBf(9) | = 13 | `A3_0A3_00A` |
| BBf(10) | = 17 | `A4_0A3_00A` |
| BBf(11) | = 28 | `0BA_20A_A10_0A2` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBf(12) | 0\* |

## BBf(1)

### Busy Beaver — `A`

```txt
// Simulation
start → [1] → [0] → halt
```

### Translated Cycler — `1`

TODO

## BBf(2)

### Busy Beaver — `A1`

```txt
// Simulation
start → [1,0] → [0,1] → halt
```

## BBf(3)

### Busy Beaver — `A1_0A`

```txt
// Simulation
start → [1,0] → [0,1] → [0,0] → halt
```

## BBf(4)

### Busy Beaver — `A2_0A`

```txt
// Simulation
start → [1,0] → [0,2] → [0,1] → [0,0] → halt
```

### Cycler — `A1_1A`

Completes a cycle every 2 steps.

```txt
// Simulation
start → [1,0] → [0,1] → [1,0] → [0,1]
```

### Translated Cycler — `1A_A2`

TODO

Other: `11A_A01` `1A1_A1`

## BBf(5)

### Champion — `A3_0A`

```txt
// Simulation
start → [1,0] → [0,3] → [0,2] → [0,1] → [0,0] → halt
```

## BBf(6)

### Champion — `A4_0A`

```txt
// Simulation
start → [1,0] → [0,4] → [0,3] →
[0,2] → [0,1] → [0,0] → halt
```

## BBf(7)

### Champion — `A2_0A2_00A`

```txt
// Simulation
start → [1,0,0] → [0,2,0] → [0,1,2] →
[0,0,4] → [0,0,3] → [0,0,2] → [0,0,1] →
[0,0,0] → halt
```

## BBf(8)

### Champion — `A3_0A2_00A`

```txt
// Simulation
start → [1,0,0] → [0,3,0] → [0,2,2] →
[0,1,4] → [0,0,6] → [0,0,5] → [0,0,4] →
[0,0,3] → [0,0,2] → [0,0,1] → [0,0,0] → halt
```

## BBf(11)

### Champion — `0BA_20A_A1_0A2`

```txt
// Trajectory
start → F(1) → F(4) → F(3) → F(2) → F(5) → halt

// Definition
F(n) := [0,n,0]
```

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Fractran)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
