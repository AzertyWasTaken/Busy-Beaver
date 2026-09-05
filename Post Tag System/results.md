# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBPT(1) | = 1 | `0` |
| BBPT(2) | = 2 | `10_` |
| BBPT(3) | = 4 | `011_` |
| BBPT(4) | = 5 | `011_1` |
| BBPT(5) | ≥ 19 | `111_20_` |
| BBPT(6) | ≥ 49 | `11_021_2` |
| BBPT(7) | ≥ 779 | `112_1_002` |
| BBPT(8) | ≥ 196,841 | `120221_0_2` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBPT(5) | 3 |
| BBPT(6) | 89 |
| BBPT(7) | 1,002 |
| BBPT(8) | 14,225 |

## BBPT(1)

The only programs of this size halt in a single step.

### Busy Beaver — `0`

Runs for 1 step before halting.

```txt
// Simulation
start → 00 → 0 → halt
```

## BBPT(2)

Programs of size 2 cannot grow: they either halt or cycle every step.

### Busy Beaver — `10_`

Runs for 2 steps before halting.

```txt
// Simulation
start → 00 → 10 → eps → halt
```

### Cycler — `00`

The queue stays exactly the same, causing the program to never halt.

```txt
// Simulation
start → 00 → 00 → 00
```

## BBPT(3)

Deciding this domain would require:

- Cycler decider.
- Deciding: `000` `001_` `010_`
- Simulating PTs for a few steps.

### Busy Beaver — `011_`

Runs for 4 steps before halting.

```txt
// Simulation
start → 00 → 011 → 1011 → 11 → eps → halt
```

### Translated Cycler — `000`

The string grows indefinitely by a zero per step.

```txt
// Simulation
start → 0 → 00 → 000 → 0000
```

### Multi-Period Cycler — `001_`

Completes a cycle every 3 steps.

```txt
// Simulation
start → 00 → 001 → 1001 → 01 → 001
```

Another multi-period cycler: `010_`

## BBPT(4)

Deciding this domain would require:

- Cycler decider.
- Even index decider.
- Non decreasing decider.
- Deciding: `001_0` `010_0`
- Simulating PTs for a few steps.

Proving this domain requires multi-period cycler, even index deciders and solving `000` and `010_0`.

### Busy Beaver — `011_1`

Runs for 5 steps before halting.

```txt
// Simulation
start → 00 → 011 → 1011 → 111 → 11 → 1 → halt
```

### Chaotic — `001_0`

Follows a chaotic pattern. It is nonhalting because its production rule `0 → 001` has two consecutive zeros.

```txt
// Simulation
start → 00 → 001 → 1001 → 010 → 0001 →
01001 → 001001 → 1001001 → 010010 →
0010001 → 10001001 → 0010010 → 10010001
```

Another chaotic program: `010_0` (is nonhalting for a similar reason)

## BBPT(5)

Proving this domain requires multi-period cycler, even index deciders and solving `000` and `010_0`.

### Champion — `111_20_`

Computes a collatz-like function then halts after 19 steps.

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

### Multi-Period Translated Cycler — `01010_`

Complete a cycle every 5 steps, with an offset of 5 steps.

### Cubic Bell — `010_21_`

- Each growth burst takes 2 more steps than the previous one.

### Chaotic 2 — `010_2_0`

- It is currently undecided.
- It is similar to the first one but seems to be much harder to decide.
- Ones are separated by at least 2 zeros. Hence twos are separated by at least 1 zero.

See also: `0210_0_`

### Bouncer — `0111_0`

- Follows a sawtooth-like pattern.

## BBPT(6)

### Champion — `11_021_2`

- Runs for 49 steps before halting.
- Has a chaotic behavior.

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
- [Bouncer](https://wiki.bbchallenge.org/wiki/Bouncer)
- [Cubic Bell](https://wiki.bbchallenge.org/wiki/Bell)
- [Collatz-Like](https://wiki.bbchallenge.org/wiki/Collatz-like)
