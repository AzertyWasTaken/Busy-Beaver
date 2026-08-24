# README

## Champions

| Domain | Runtime | Champion |
| - | - | - |
| BBPT(1) | = 1 | `0` |
| BBPT(2) | = 2 | `10` |
| BBPT(3) | ≥ 4 | `011` |
| BBPT(4) | ≥ 5 | `011_1` |
| BBPT(5) | ≥ 19 | `111_20` |
| BBPT(6) | ≥ 49 | `11_021_2` |
| BBPT(7) | ≥ 779 | `112_1_002` |

## Holdouts

| Domain | Holdouts |
| - | - |
| BBPT(2) | 1 |
| BBPT(3) | 4 |
| BBPT(4) | 55 |
| BBPT(5) | 361 |
| BBPT(6) | 4,527 |
| BBPT(7) | 43,477 |

## BBPT(5)

### Champion — `111_20`

- Runs for 19 steps before halting.
- Computes the function:
  $$start → F(3)$$
  $$F(2n+1) → F(3n+2)$$
  $$F(2n) → halt$$
  Where F(n) = `1^n`
  The result is F(3) → F(8) → halt

## See Also

- [Champions List](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
