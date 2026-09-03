# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BB(2) | = 6 | `1RB1LB_1LA---` |
| BB(3) | = 21 | `1RB---_1LB0RC_1LC1LA` |
| BB(4) | = 107 | `1RB1LB_1LA0LC_---1LD_1RD0RA` |
| BB(2,3) | = 38 | `1RB2LB---_2LA2RB1LB` |
| BB(3,3) | > 1.191e17 | `0RB2LA1RA_1LA2RB1RC_---1LB1LC` |
| BB(2,4) | = 3,932,964 | `1RB2LA1RA1RA_1LB1LA3RB---` |
<!--
| BB(5) | = 47,176,870 | `1RB1LC_1RC1RB_1RD0LE_1LA1LD_---0LA` |
| BB(6) | > ttt8 | `1RB1RA_1RC---_1LD0RF_1RA0LE_0LD1RC_1RA0RE` |
| BB(7) | > f(11)f(10)4 | `1RB0RA_1LC1LF_1RD0LB_1RA1LE_---0LC_1RG1LD_0RG0RF` |
-->
<!-- 
| BB(4,3) | > pppe28 | `1RB1RD1LC_2LB1RB1LC_---1LA1LD_0RB2RA2RD` |
| BB(3,4) | > fff(14)4 | `1RB3LB---2RA_2LC3RB1LC2RA_3RB1LB3LC2RC` |
| BB(2,5) | > eee3,314,360 | `1RB3LA4RB0RB2LA_1LB2LA3LA1RA---` |
| BB(3,5) | > f(ω)fff(14)4 | `1RB3LB4LC2RA4LB_2LC3RB1LC2RA---_3RB1LB3LC2RC4LC` |
| BB(2,6) | > ttee115 | `1RB3RB5RA1LB5LA2LB_2LA2RA4RB---3LB2LA` |
-->

## Holdouts

| Domain | Holdouts |
| - | - |
| BB(3) | 40 |
| BB(4) | 10,466 |
| BB(2,3) | 133 |
| BB(2,4) | 25,417 |

## BB(2)

Deciding this domain would require:

- Cycler decider.
- Translated cycler decider.
- Simulating TMs for a few steps.

### Busy Beaver — `1RB1LB_1LA---`

Runs for 6 steps before halting.

```txt
// Simulation
start → 00A0 → 001B → 00A1 → 0B11 → A111 → 1B11 → halt
```

Other busy beavers:

- `1RB0LB_1LA---`
- `1RB---_1LB1LA`
- `1RB---_0LB1LA`
- `0RB---_1LA1RB`

### Cycler — `1RB1RB_0LA---`

Completes a cycles every 2 steps.

```txt
// Simulation
1B → A0 → 1B
```

Other cyclers:

- `1RB---_0LB1RB`
- `1RB0RB_0LA---` (4 steps period)

### Translated Cycler — `1RB---_0LB0LB`

Runs for 3 steps then cycles leftward.

```txt
// Simulation
00A0 → 001B → 00B0 → 0B00 → B000
```

Other translated cyclers:

- `1RB---_1LB0RB` (5 steps preperiod)
- `1RB0RA_1LA---` (4 steps period)
- `1RB1RA_1LA---` (slighty harder to decide)

## BB(3)

Proving this domain requires deciding bouncers and counters.

### Busy Beaver — `1RB---_1LB0RC_1LC1LA`

- Runs for 21 steps before halting.

```txt
// Trajectory
start → F(0) → F(1) → F(3) → halt

// Definition
F(n) := A0 1^n
```

### Bouncer — `1RB1LA_1LA1RC_---1RB`

- Bounces indefinitely back and forth on a growing string of ones.

### Counter — `1RB1LC_0LA0RB_1LA---`

- Counts in binary, where `0 → 00` and `1 → 10`.

## BB(4)

### Busy Beaver — `1RB1LB_1LA0LC_---1LD_1RD0RA`

- Runs for 107 steps before halting.
- Follows a permutation-like trajectory.

```txt
// Trajectory
start → F(0) → F(3) → F(5) → F(4) → F(2) → halt

// Definition
F(n) := 1^n 01 B0
```

## BB(2,3)

### Busy Beaver — `1RB2LB---_2LA2RB1LB`

- Runs for 38 steps before halting.
- Bounces back and forth until there is no twos at right end of the string.

```txt
// Function
start → F(2)
F(n+1) → F(n)
F(0) → halt

// Definition
F(n) := B0 1^k 2^n
```

### Bouncer — `1RB2LA1RA_0LA---1RA`

- Bounces indefinitely back and forth on a growing string of ones and twos.

### Counter — `1RB1LA1RB_0LA2RB---`

- Counts in binary, where `0 → 1` and `1 → 2` with a one at the left end of the string.

## BB(2,4)

### Busy Beaver — `1RB2LA1RA1RA_1LB1LA3RB`

- Runs for 3,932,964 steps before halting.
- Computes a Collatz-like function.

```txt
// Function
start → G(0)
F(3k) → F(5k+1)   | G(3k) → G(5k+1)
F(3k+1) → halt    | G(3k+1) → F(5k+3)
F(3k+2) → G(5k+4) | G(3k+2) → halt

// Trajectory
start → G(0) → G(1) → F(3) → F(6) → F(11) →
G(19) → F(33) → F(56) → G(94) → F(158) → G(264) →
G(441) → G(736) → F(1228) → halt

// Definition
F(n) := A0 2^n 1
G(n) := A0 2^n 11
```

### Untitled — `1RB1LB2RB---_2LA2LB3RA0LB`

- It seems to be a bouncer at left and a counter at right.

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Champions)
- [Cycler](https://wiki.bbchallenge.org/wiki/Cycler)
- [Translated Cycler](https://wiki.bbchallenge.org/wiki/Translated_cycler)
- [Bouncer](https://wiki.bbchallenge.org/wiki/Bouncer)
- [Counter](https://wiki.bbchallenge.org/wiki/Counter)

### Domains

- [BB(2)](https://wiki.bbchallenge.org/wiki/BB(2))
- [BB(3)](https://wiki.bbchallenge.org/wiki/BB(3))
- [BB(4)](https://wiki.bbchallenge.org/wiki/BB(4))
- [BB(2,3)](https://wiki.bbchallenge.org/wiki/BB(2,3))
- [BB(3,3)](https://wiki.bbchallenge.org/wiki/BB(3,3))
- [BB(2,4)](https://wiki.bbchallenge.org/wiki/BB(2,4))
<!--
- [BB(5)](https://wiki.bbchallenge.org/wiki/BB(5))
- [BB(6)](https://wiki.bbchallenge.org/wiki/BB(6))
- [BB(7)](https://wiki.bbchallenge.org/wiki/BB(7))
-->
<!-- 
- [BB(4,3)](https://wiki.bbchallenge.org/wiki/BB(4,3))
- [BB(3,4)](https://wiki.bbchallenge.org/wiki/BB(3,4))
- [BB(2,5)](https://wiki.bbchallenge.org/wiki/BB(2,5))
- [BB(3,5)](https://wiki.bbchallenge.org/wiki/BB(3,5))
- [BB(2,6)](https://wiki.bbchallenge.org/wiki/BB(2,6))
-->

### Machines

- [BB(3,3)](https://wiki.bbchallenge.org/wiki/0RB2LA1RA_1LA2RB1RC_---1LB1LC)
- [BB(2,4)](https://wiki.bbchallenge.org/wiki/1RB2LA1RA1RA_1LB1LA3RB1RZ)
<!--
- [BB(5)](https://wiki.bbchallenge.org/wiki/5-state_busy_beaver_winner)
- [BB(6)](https://wiki.bbchallenge.org/wiki/1RB1RA_1RC1RZ_1LD0RF_1RA0LE_0LD1RC_1RA0RE)
- [BB(7)](https://wiki.bbchallenge.org/wiki/1RB0RA_1LC1LF_1RD0LB_1RA1LE_1RZ0LC_1RG1LD_0RG0RF)
- [BB(4,3)](https://wiki.bbchallenge.org/wiki/1RB1RD1LC_2LB1RB1LC_1RZ1LA1LD_0RB2RA2RD)
- [BB(3,4)](https://wiki.bbchallenge.org/wiki/1RB3LB1RZ2RA_2LC3RB1LC2RA_3RB1LB3LC2RC)
- [BB(2,5)](https://wiki.bbchallenge.org/wiki/1RB3LA4RB0RB2LA_1LB2LA3LA1RA1RZ)
- [BB(2,6)](https://wiki.bbchallenge.org/wiki/1RB3RB5RA1LB5LA2LB_2LA2RA4RB1RZ3LB2LA)
-->
