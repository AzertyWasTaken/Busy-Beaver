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
| Turing Machine | 35 | 120 |
| Post Tag System | 12 | 60 |

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
