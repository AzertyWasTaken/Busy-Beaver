# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBCS(1) | = 1 | `+A` |
| BBCS(2) | = 2 | `+A_+A` |
| BBCS(3) | = 3 | `+A_+A_+A` |
| BBCS(4) | = 4 | `+A_+A_+A_+A` |
| BBCS(5) | = 6 | `+A_+A_+A_wA{-A}` |
| BBCS(6) | = 9 | `+A_+A_+A_wA{-A_+B}` |
| BBCS(7) | = 12 | `+A_+A_+A_+A_wA{-A_+B}` |
| BBCS(8) | = 18 | `+A_wA{+A_wB{-A_-B}_+B_+B}` |
| BBCS(9) | = 26 | `+A_+A_wA{+A_wB{-A_-B}_+B_+B}` |
| BBCS(10) | ≥ 34 | `+A_+A_+A_wA{+A_wB{-A_-B}_+B_+B}` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBCS(9) | 6 |

## BBCS(3)

### Translated Cycler — `+A_wA{+A}`

```txt
// Simulation
start → [0] → [1] → [2] → [3]
```

### Cycler — `+A_wA{-B}`

```txt
// Simulation
start → [0,0] → [1,0] → [1,0] → [1,0]
```

## BBCS(5)

### Busy Beaver — `+A_+A_+A_wA{-A}`

```txt
// Simulation
start → [0] → [1] → [2] →
[3] → [2] → [1] → [0] → halt
```

### Multi-Period Cycler — `+A_wA{+A_-A}`

```txt
// Simulation
start → [0] → [1] → [2] → [1] → [2]
```

## BBCS(8)

### Busy Beaver — `+A_wA{+A_wB{-A_-B}_+B_+B}`

```txt
// Function wA1
[a,b] → [a-b+1,2]

// Trajectory
start → [1,0] → [2,2] → [1,2] → [0,2] → halt
```

## BBCS(9)

### Bouncer — `+A_wA{+A_wA{-A_+B}_wB{+A_-B}}`

Multiplicative bouncer: `+A_wA{wA{-A_+B_+B}_wB{+A_-B}}`
