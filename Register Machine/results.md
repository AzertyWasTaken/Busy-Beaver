# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBR(1) | = 1 | `0+` |
| BBR(2) | = 3 | `0+_0-B` |
| BBR(3) | = 5 | `0+_0+_0-C` |
| BBR(4) | = 10 | `0+_1+_0-B_1-C` |
| BBR(5) | = 16 | `0+_1+_1+_0-B_1-D` |
| BBR(6) | ≥ 37 | `0-E_0+_1-B_1+_1+_0-A` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBR(5) | 1 |
| BBR(6) | 161 |

## BBR(1)

### Busy Beaver — `0+`

```txt
// Simulation
start → A[0] → halt
```

## BBR(2)

### Busy Beaver — `0+_0-B`

```txt
// Simulation
start → A[0] → B[1] → B[0] → halt
```

### Cycler — `0+_0-A`

```txt
// Simulation
start → A[0] → B[1] → A[0] → B[1]
```

## BBR(3)

### Busy Beaver — `0+_0+_0-C`

```txt
// Simulation
start → A[0] → B[1] → C[2] → C[1] → C[0] → halt
```

### Translated Cycler — `0+_0+_0-A`

```txt
// Simulation
start → A[0] → B[1] → C[2] → A[1] → B[2] → C[3]
```

Other translated cyclers: `0+_1+_0-A` `0+_1+_1-A`

## BBR(4)

### Busy Beaver — `0+_1+_0-B_1-C`

```txt
// Simulation
start → A[0,0] → B[1,0] → C[1,1] → B[0,1] → C[0,2]
D[0,2] → C[0,1] → D[0,1] → C[0,0] → D[0,0] → halt
```

### Double Translated Cycler — `0+_0+_1+_0-A`

TODO

## BBR(5)

### Busy Beaver — `0+_1+_1+_0-B_1-D`

TODO

### Bouncer — `0+_1-A_1+_0-C_1-A`

Repeatedly set the counter `1` to the counter `0` plus one then set counter `0` to counter `1`.

```txt
// Simulation
start → A[0,0] → B[1,0] → C[1,0] → D[1,1]
C[0,1] → D[0,2] → E[0,2] → A[0,1]
```

## BBR(6)

### Champion — `0-E_0+_1-B_1+_1+_0-A`

```txt
// Trajectory
start → F(1) → F(3) → F(4) → halt

// Definition
F(n) := [n,0]
```
