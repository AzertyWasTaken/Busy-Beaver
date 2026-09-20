# Lambda Calculus Results

- [Spec](./spec.md)
- [Terminology](../Docs/terminology.md)

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBLdb(2) | = 0 | `/0` |
| BBLdb(3) | = 0 | `/*00` |
| BBLdb(4) | = 1 | `*/0/0` |
| BBLdb(5) | = 2 | `*/*00/0` |
| BBLdb(6) | = 3 | `*/**000/0` |
| BBLdb(7) | = 4 | `*/***0000/0` |
| BBLdb(8) | ≥ 11 | `*/*00/*0*0/0` |
| BBLdb(9) | ≥ 54 | `*/*00/*0*0*0/0` |
| BBLdb(10) | ≥ 87 | `/*/*00/*0*0*0*01` |
| BBLdb(11) | ≥ 99 | `*/*0*0**000//*1*01` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBLdb(7) | 3 |
| BBLdb(8) | 28 |
| BBLdb(9) | 410 |
| BBLdb(10) | 5,171 |
| BBLdb(11) | 72,027 |

## BBLdb(4)

### Busy Beaver — `*/0/0`

Reduces 1 time before reaching normal form.

## BBLdb(5)

### Busy Beaver — `*/*00/0`

Reduces 2 times before reaching normal form.

## BBLdb(6)

### Cycler — `*/*00/*00`

Reduces to itself.

## BBLdb(7)

### Translated Cycler — `*/**000/*00`

Self-duplicate.
