# Register Machine Results

- [Spec](./spec.md)
- [Terminology](../Docs/terminology.md)

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| MBB(1) | = 1 | `+0*` |
| MBB(2) | = 3 | `+0B_-0B*` |
| MBB(3) | = 5 | `+0B_+0C_-0C*` |
| MBB(4) | = 10 | `+0B_+1C_-0BD_-1C*` |
| MBB(5) | ≥ 24 | `-0BC_+1A_+0D_-1EB_-1C*` |
| MBB(6) | ≥ 49 | `+0B_-1FC_+1D_-0CE_+0A_-1A*` |
| MBB(7) | ≥ 231 | `+0B_+0C_+0D_-1GE_+1F_-0EC_-1A*` |

## Holdouts

| Domain | Holdouts |
| - | - |
| MBB(5) | 35 |
| MBB(6) | 1,986 |

## MBB(1)

The domain has 3 programs: 2 busy beavers and 1 cycler.

### Busy Beaver — `+0*`

Runs for 1 step before halting.

```txt
// Simulation
start → A[0] → halt
```

Other busy beaver: `-0A*`, which halts in 1 step because counter `0` starts at 0.

### Cycler — `-0*A`

Counter `0` is never incremented, so the halt branch of `A` is never taken.

```txt
// Simulation
start → A[0] → A[0] → A[0]
```

## MBB(2)

Deciding this value requires the translated cycler decider.

### Busy Beaver — `+0B_-0B*`

Runs for 3 steps before halting.

```txt
// Simulation
start → A[0] → B[1] → B[0] → halt
```

Other busy beaver: `-0*B_+0A`.

### Translated Cycler — `-0*B_+0B`

Increments counter `0` in a loop on `B`, so the halt branch of `A` is never taken.

```txt
// Simulation
start → A[0] → B[0] → B[1] → B[2]
```

### Cycler — `+0B_-0A*`

Completes a cycle every 2 steps.

```txt
// Simulation
start → A[0] → B[1] → A[0] → B[1]
```

## MBB(3)

Deciding this value requires the translated cycler decider.

### Busy Beaver — `+0B_+0C_-0C*`

Runs for 5 steps before halting.

```txt
// Simulation
start → A[0] → B[1] → C[2] → C[1] → C[0] → halt
```

### Multi-Period Translated Cycler — `+0B_+0C_-0A*`

Completes a cycle every 3 steps while increasing counter `0` by 1.

```txt
// Simulation
start → A[0] → B[1] → C[2] → A[1] → B[2] → C[3]
```

Another translated cycler: `+0B_+1C_-0A*`

## MBB(4)

Deciding this value requires the translated cycler decider.

### Busy Beaver — `+0B_+1C_-0BD_-1C*`

Runs for 10 steps before halting.

```txt
// Simulation
start → A[0,0] → B[1,0] → C[1,1] → B[0,1] → C[0,2]
D[0,2] → C[0,1] → D[0,1] → C[0,0] → D[0,0] → halt
```

### Double Translated Cycler — `+0B_+0C_+1D_-0A*`

Completes a cycle every 4 steps while increasing both counters by 1.

```txt
// Simulation
start → A[0,0] → B[1,0] → C[2,0] → D[2,1] → A[1,1] →
B[2,1] → C[3,1] → D[3,2] → A[2,2]
```

## MBB(5)

Deciding this value requires the translated cycler decider and a bouncer decider.

### Champion — `-0BC_+1A_+0D_-1EB_-1C*`

Runs for 24 steps before halting.

```txt
// Function
start → F(0)
F(2n) → F(n+2)
F(2n+1) → halt

// Trajectory
start → F(0) → F(2) → F(3) → halt

// Definition
F(n) := A[0,n]
```

### Bouncer — `+0B_-1AC_+1D_-0CE_-1A*`

Counts counter `0` up to counter `1` plus one, then counts counter `1` up to counter `0`, so counter `1` grows by one at every cycle. The translated cycler decider misses it: counter `1` reaches 0 during every cycle, so the decider requires it to come back to its saved value, which it does not.

```txt
// Simulation
start → A[0,0] → B[1,0] → C[1,0] → D[1,1]
C[0,1] → D[0,2] → E[0,2] → A[0,1]
```

Other bouncers:

- `+0B_-1*C_-2AD_+2E_-0DA` (add 2 every cycle)
- `+0B_+0C_-1AD_+1E_-0DA` (double every cycle)

## MBB(6)

Proving this value requires a bouncer decider.

### Champion — `+0B_-1FC_+1D_-0CE_+0A_-1A*`

Runs for 49 steps before halting.

```txt
// Function
start → F(1)
F(2n) → halt
F(2n+1) → F(n+3)

// Trajectory
start → F(1) → F(3) → F(4) → halt

// Definition
F(n) := B[n,0]
```

## MBB(7)

The domain is not enumerated yet: the champion below is the longest run found.

### Champion — `+0B_+0C_+0D_-1GE_+1F_-0EC_-1A*`

Runs for 231 steps before halting.

```txt
// Function
start → F(3)
F(2n) → halt
F(2n+1) → F(3n+4)

// Trajectory
start → F(3) → F(7) → F(13) → F(22) → halt

// Definition
F(n) := D[n,0]
```

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Register_machine)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
- [Bouncer](https://wiki.bbchallenge.org/wiki/Bouncer)
