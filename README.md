# README

![Status](https://img.shields.io/badge/Status-Active-informational)
![Language](https://img.shields.io/badge/Language-JavaScript-purple)

This project studies the Busy Beaver function for various computational models

If you find any interesting information here, you can add it to the [Busy Beaver wiki](https://wiki.bbchallenge.org/wiki/Main_Page):

## Goals

- **Explore** various computational systems.
- **Enumerate** all programs up to a given length.
- **Decide holdouts** (prove they are halting or nonhalting).
- **Find new champions** (longest-halting programs).
- **Find cryptids** (mathematically hard to decide).
- **Document** results and findings.

## How to run?

- Open `writer.js`
- Configure `STATES`, `SYMBOLS` and `MAX_STEPS`
- Run the script

## Stats

| System | BB-index | Active Code Size |
| - | - | - |
| Post Tag System | 150 | 150 |
| Turing Machine | 70 | 210 |
| Cyclic Tag System | 40 | 60 |

### BB-index

BB-index is an estimation of how advanced research is for a computational model.
A machine is studied if it is decided or analyzed.
The BB-index is defined as the average of complexity of:

- most complex studied programs.
- least complex unstudied programs.

BBCS is used as a reference to rate programs complexity.
For example, a simple bouncer is about 9 since it is the length of smallest possible bouncers in CounterScript.
Fibonacci function is applied for better scaling, so 9 becomes F(9) = 34.

### Active Code Size

Active Code Size is a metric to determine how many code is used for research.
It is an approximation of the total lines count of scripts used for enumeration or simulation, excluding writer and website scripts.

## Conventions

### Size Metrics

- Do not count unecessary stuff. If anything can be ignored without created infinitely many nonequivalent programs, do not count it.
- The ratio between size and the actual length of the program must remain finite.

### Systems

- Every system must be Turing-complete.
- No unecessary complexity. If a complex mechanic can be removed without affecting its Turing-completeness, remove it.
- The Busy Beaver function must count steps, not the final output.

### Results

- A `Champions` section with a table of champions and their running time.

- A `Holdouts` section with a table of current holdouts count.

- An `analysis` section separated by domains.

  - A list of what deciders are required to solve the value.
  - An analysis of the champion.
  - Analysis of other notable programs.

- A `See Also` section with links to relevant Busy Beaver Wiki pages.
