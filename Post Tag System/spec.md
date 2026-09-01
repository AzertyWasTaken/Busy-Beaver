# Post Tag System Specification

## Composition

- A finite **queue** of **symbols**.
- A **code** consisting of a list of **production rules**.

## Execution

- The post tag system starts out with **queue** equal to "00".
- At each step of the computation, **read** the **first symbol** of the **queue**, **append** the **production rule** to the **queue** then **remove** the **two first symbols**.
- The post tag system halts when it has less than two symbol.

## Function

The function *BBPT(n)* is the largest number of steps that any Post tag systems of size *n* takes before halting.

The size of a Post tag system is the total number of symbols in every production rule.

## See Also

- [Post Tag System](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
