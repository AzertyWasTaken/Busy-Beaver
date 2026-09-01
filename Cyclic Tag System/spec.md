# Cyclic Tag System Specification

## Composition

- A finite **queue** of **bits**.
- A **code** consisting of a list of **production rules**.
- A **head** pointing at one of the production rules.

## Execution

- The cyclic tag system starts out with **queue** equal to "1", with the **head** pointing to the **first rules**.
- At each step of the computation, **read** the **first symbol** of the **queue** and append the **production rules** to the **queue** if it 1.
- **Move** the **head** one rule forward or at the first rule if it is pointing to the last rule.
- The cyclic tag system halts when it has less than two symbol.

## Function

The function *BBCT(n)* is the largest number of steps that any cyclic tag systems of size *n* takes before halting.

The size of a cyclic tag system is the sum of the symbols count and production rules count.

## See Also

- [Cyclic Tag System](https://wiki.bbchallenge.org/wiki/Cyclic_Tag)
