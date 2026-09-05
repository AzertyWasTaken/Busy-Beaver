# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBCA(2) | = 2 | `111-` |
| BBCA(3) | ≥ 21 | `2022-1120` |
| BBCA(4) | ≥ 100 | `3001231130-01210` |
| BBCA(2,3) | ≥ 4 | `1011110-` |
| BBCA(2,4) | ≥ 93 | `10011-1011101000` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBCA(3) | 156 |
| BBCA(2,3) | 5 |
| BBCA(2,4) | 1,189 |

## BBCA(2)

### Champion — `111-`

Runs for 2 steps.

```txt
// Simulation
start → 10 → 11 → halt
```

### Cycler — `110-`

The initial configuration stays the same forever.

```txt
// Simulation
start → 1 → 1 → 1
```

## BBCA(3)

### Champion — `2022-1120`

A fractal-like pattern that halts if there are 2 consecutive ones, which happen after 21 steps.

### Multi-Period Cycler — `2210--0--`

Completes a cycle every 2 steps.

```txt
// Simulation
start → 1 → 2 → 1
```

### Translated Cycler — `21112010-`

Cycles every 3 steps and grows 3 cells.

Other translated cyclers:

- `21-120110` (double)

### Fractal — `21-121-10`

Follows a Sierpinski triangle pattern.

```txt
// Simulation
start → 10000000 → 11000000 → 12100000 → 10010000
11011000 → 12112100 → 10020010 → 11000011
```

Other fractals:

- `21-120010` (similar)
- `210121-00` (similar)
- `21212000-`

### Chaotic — `21-120011`

Seems to leave cyclers parts while the chaotic part moves forward while growing.

Other chaotic:

- `210121-01`

## BBCA(2,3)

### Champion — `1110011-`

- Runs for 4 steps then halts.

```txt
// Simulation
start → 1000 → 1100 → 1010 → 1111 → halt
```

### Multi-Period Cycler — `11100-0-`

- Has a **period** of 2 steps.

```txt
// Simulation
start → 10 → 11 → 10
```

### Translated Cycler — `11110-11`

Grows by 1 one every step.

```txt
// Simulation
start → 1000 → 1100 → 1110 → 1111
```

Other translated cyclers:

- `11111-11`
- `110-11--` (stripes)
- `1110001-` (checkboard)

### Fractal — `110-10--`

- The pattern is a Sierpinski triangle with an horizontal gap per cell.

## BBCA(2,4)

### Champion — `10011-1011101000`

- Runs for 94 steps then halts.
- Follows a chaotic pattern.

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Cellular_automaton)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
- [Fractal](https://wiki.bbchallenge.org/wiki/Fractal)
