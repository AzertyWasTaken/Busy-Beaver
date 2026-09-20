# Sequential Substitution System Results

- [Spec](./spec.md)
- [Terminology](../Docs/terminology.md)

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBSS(1) | = 1 | `0>` |
| BBSS(2) | = 1 | `0>1` |
| BBSS(3) | = 2 | `0>1_1>` |
| BBSS(4) | = 3 | `0>11_1>` |
| BBSS(5) | ≥ 4 | `0>111_1>` |
| BBSS(6) | ≥ 5 | `0>1111_1>` |
| BBSS(7) | ≥ 7 | `0>111_1>2_2>` |
| BBSS(8) | ≥ 10 | `0>111_1>22_2>` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBSS(5) | 25 |
| BBSS(6) | 275 |
| BBSS(7) | 3,646 |
| BBSS(8) | 47,209 |

## BBSS(1)

Every program halts in at most one step.

### Busy Beaver — `0>`

Replaces the initial `0` with nothing, then halts on the empty string.

```txt
// Simulation
start → 0 → eps → halt
```

## BBSS(2)

Every program halts in at most one step, or rewrites the initial `0` into itself forever.

### Busy Beaver — `0>1`

Runs for 1 step before halting: the `0` becomes a `1`, which no rule matches.

```txt
// Simulation
start → 0 → 1 → halt
```

### Cycler — `0>0`

Rewrites the `0` back into a `0`, causing the program to never halt.

```txt
// Simulation
start → 0 → 0 → 0
```

## BBSS(3)

Every program is decided: it halts in at most 2 steps, or never halts as a translated cycler.

### Busy Beaver — `0>1_1>`

Runs for 2 steps before halting: the `0` becomes a `1`, then the `1` is erased.

```txt
// Simulation
start → 0 → 1 → eps → halt
```

### Translated Cycler — `0>00`

The string grows indefinitely by a zero per step.

```txt
// Simulation
start → 0 → 00 → 000 → 0000
```

Other translated cyclers: `0>01` `0>10` (both grow by one `1` per step).

## BBSS(4)

Every program is decided: it halts in at most 3 steps, or never halts.

### Busy Beaver — `0>11_1>`

Runs for 3 steps before halting: the `0` becomes two `1`s, which are erased one by one.

```txt
// Simulation
start → 0 → 11 → 1 → eps → halt
```

### Multi-Period Cycler — `0>1_1>0`

Completes a cycle every 2 steps: the `0` and the `1` replace each other.

```txt
// Simulation
start → 0 → 1 → 0 → 1
```

## BBSS(5)

The first domain with holdouts: 25 programs resist every current decider.

### Champion — `0>111_1>`

Runs for 4 steps before halting: the `0` becomes three `1`s, which are erased one by one.

```txt
// Simulation
start → 0 → 111 → 11 → 1 → eps → halt
```

### Multi-Period Translated Cycler — `0>11_1>0`

Grows by one `1` every 2 steps: the rules alternate, rewriting the leftmost symbol while the block of `1`s keeps growing. It is undecided.

```txt
// Simulation
start → 0 → 11 → 01 → 111 → 011 → 1111
```

## BBSS(6)

275 holdouts, including every BBSS(5) holdout. Deciding this domain requires the translated cycler decider (see `TODO.md`).

### Champion — `0>1111_1>`

Runs for 5 steps before halting: the `0` becomes four `1`s, which are erased one by one.

```txt
// Simulation
start → 0 → 1111 → 111 → 11 → 1 → eps → halt
```

## BBSS(7)

3,646 holdouts, including every BBSS(6) holdout. Deciding this domain requires the translated cycler decider (see `TODO.md`).

### Champion — `0>111_1>2_2>`

Runs for 7 steps before halting: the `0` becomes three `1`s, each `1` becomes a `2`, and the `2`s are erased one by one.

```txt
// Simulation
start → 0 → 111 → 211 → 221 →
222 → 22 → 2 → eps → halt
```

## BBSS(8)

47,209 holdouts, including every BBSS(7) holdout. Deciding this domain requires the translated cycler decider (see `TODO.md`).

### Champion — `0>111_1>22_2>`

Runs for 10 steps before halting: the `0` becomes three `1`s, each `1` becomes two `2`s, and the `2`s are erased one by one.

```txt
// Simulation
start → 0 → 111 → 2211 → 22221 →
222222 → 22222 → … → 2 → eps → halt
```

## See Also

- [Busy Beaver Function](https://wiki.bbchallenge.org/wiki/Busy_Beaver_Functions)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
