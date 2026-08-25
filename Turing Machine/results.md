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
| BB(2) | 15 |
| BB(3) | 1,837 |
| BB(4) | 323,858 |
| BB(2,3) | 1,550 |
| BB(2,4) | 192,101 |

## BB(2)

### Cycler — `1RB1RB_0LA---`

- Cycles every 2 steps.

### Translated Cycler — `1RB0LA_0LA---`

- Cycles 1 cell rightward then 2 cells leftward.
- The total period is 3 steps and 1 cell leftward.

### Champion — `1RB1LB_1LA---`

- Runs for 6 steps before halting.
- Transitions `B0` and `A0` are used twice.

## BB(3)

### Champion — `1RB---_1LB0RC_1LC1LA`

- Runs for 21 steps before halting.

```txt
// Trajectory
start → F(0) → F(1) → F(3) → halt

// Definition
F(n) := _<A 1^n_
```

## BB(4)

### Champion — `1RB1LB_1LA0LC_---1LD_1RD0RA`

- Runs for 107 steps before halting.
- Follows a permutation-like trajectory.

```txt
// Trajectory
start → F(0) → F(3) → F(5) → F(4) → F(2) → halt

// Definition
F(n) := _1^n 01 B>_
```

## BB(2,3)

### Champion — `1RB2LB---_2LA2RB1LB`

- Runs for 38 steps before halting.
- Bounces back and forth until there is no twos at right end of the string.

```txt
// Function
start → F(2)
F(n+1) → F(n)
F(0) → halt

// Definition
F(n) := _<B 1^k 2^n_
```

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Champions)

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
