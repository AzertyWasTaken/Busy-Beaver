# Cyclic Tag System Specification

## Composition

- A finite **string** of **bits**.
- A **code** consisting of a list of **production rules**.
- A **head** pointing at one of the production rules.

## Execution

- The cyclic tag system starts out with **string** equal to "1", with the **head** pointing to the **first rules**.
- At each step of the computation, **read** the **first symbol** of the **string** and append the **production rules** to the **string** if it 1.
- **Move** the **head** one rule forward or at the first rule if it is pointing to the last rule.
- The cyclic tag system halts when it has less than two symbol.

## See Also

- [Cyclic Tag System](https://wiki.bbchallenge.org/wiki/Cyclic_Tag)
