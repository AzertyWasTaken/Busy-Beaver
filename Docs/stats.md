# Stats

| System | BB-index | Active Code Size |
| - | - | - |
| Turing Machine | 350 | 340 |
| Post Tag System | 250 | 240 |
| Cyclic Tag System | 120 | 170 |
| Pebble Automaton | 20 | 210 |
| Cellular Automaton | 10 | 110 |

## BB-index

BB-index is an informal estimation of how advanced research is for a computational model.
A machine is studied if it is decided or analyzed.
The BB-index is defined as the average complexity of:

- the most complex studied programs.
- the least complex unstudied programs.

BBCS, the Busy Beaver function of CounterScript, is used as a reference scale to rate program complexity: the complexity of a program is the size of the smallest CounterScript program that behaves like it.
For example, a simple bouncer is about 9 since the smallest possible bouncers in CounterScript have length 9.
The Fibonacci function is applied for better scaling, so 9 becomes F(9) = 34.
BB(n,m) complexity is estimated at BBCS(6(n-1)(m-1)+2).

## Active Code Size

Active Code Size is a metric to determine how much code is used for research.
It approximates the total line count (including blank lines) of the scripts used for enumeration or simulation, excluding `main.js` and website scripts.
