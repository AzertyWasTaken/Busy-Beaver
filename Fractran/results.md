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
| BBf(11) | = 28 | `0BA_20A_A1_0A2` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBf(12) | 0\* |

> \* The enumeration is not finished yet.

## BBf(1)

The nonhalting programs of this size are single instructions with no negative value, so this value needs no decider.

### Busy Beaver — `A`

Runs for 1 step before halting.

```txt
// Simulation
start → [1] → [0] → halt
```

### Translated Cycler — `1`

Adds 1 to counter `0` at every step, so the register grows forever.

```txt
// Simulation
start → [1] → [2] → [3] → [4]
```

## BBf(2)

The nonhalting programs of this size are `2` and `11`, two single instructions with no negative value, so this value needs no decider.

### Busy Beaver — `A1`

Runs for 1 step before halting.

```txt
// Simulation
start → [1,0] → [0,1] → halt
```

## BBf(3)

Every program of this size that the enumeration keeps halts, so this value needs no decider.

### Busy Beaver — `A1_0A`

Runs for 2 steps before halting.

```txt
// Simulation
start → [1,0] → [0,1] → [0,0] → halt
```

## BBf(4)

Solving this value requires the translated cycler decider, which also decides the cycler `A1_1A`.

### Busy Beaver — `A2_0A`

Runs for 3 steps before halting.

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

## BBf(5)

Solving this value requires the translated cycler decider.

### Busy Beaver — `A3_0A`

Runs for 4 steps before halting.

```txt
// Simulation
start → [1,0] → [0,3] → [0,2] → [0,1] → [0,0] → halt
```

### Translated Cycler — `1A_A2`

Completes a cycle every 3 steps while increasing counter `0` by 1.

```txt
// Simulation
start → [1,0] → [0,2] → [1,1] →
[2,0] → [1,2] → [2,1] → [3,0]
```

Other translated cyclers: `11A_A01` `1A1_A1`

## BBf(6)

Solving this value requires the translated cycler decider.

### Busy Beaver — `A4_0A`

Runs for 5 steps before halting.

```txt
// Simulation
start → [1,0] → [0,4] → [0,3] →
[0,2] → [0,1] → [0,0] → halt
```

## BBf(7)

Solving this value requires the translated cycler decider.

### Busy Beaver — `A2_0A2_00A`

Runs for 7 steps before halting.

```txt
// Simulation
start → [1,0,0] → [0,2,0] → [0,1,2] →
[0,0,4] → [0,0,3] → [0,0,2] → [0,0,1] →
[0,0,0] → halt
```

## BBf(8)

Solving this value requires the translated cycler decider.

### Busy Beaver — `A3_0A2_00A`

Runs for 10 steps before halting.

```txt
// Simulation
start → [1,0,0] → [0,3,0] → [0,2,2] →
[0,1,4] → [0,0,6] → [0,0,5] → [0,0,4] →
[0,0,3] → [0,0,2] → [0,0,1] → [0,0,0] → halt
```

## BBf(9)

Solving this value requires the translated cycler decider.

### Busy Beaver — `A3_0A3_00A`

Runs for 13 steps before halting.

```txt
// Simulation
start → [1,0,0] → [0,3,0] → [0,2,3] →
[0,1,6] → [0,0,9] → [0,0,8] → … →
[0,0,1] → [0,0,0] → halt
```

## BBf(10)

Solving this value requires the translated cycler decider.

### Busy Beaver — `A4_0A3_00A`

Runs for 17 steps before halting.

```txt
// Trajectory
start → [1,0,0] → [0,4,0] → [0,3,3] →
[0,2,6] → [0,1,9] → [0,0,12] → [0,0,11] → … →
[0,0,1] → [0,0,0] → halt
```

## BBf(11)

Solving this value requires the translated cycler decider.

### Busy Beaver — `0BA_20A_A1_0A2`

Runs for 28 steps before halting.

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
