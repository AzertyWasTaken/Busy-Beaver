# Post Tag Specification

## Composition

- A finite **string** of **symbols**.
- A **code** consisting of a list of **production rules**.

## Execution

- The tag system starts out with **string** equal to "00".
- At each step of the computation, the tag system **reads** the **first symbol** of the **string**, **append** the **production rule** to the **string** then **removes** the **two first symbols**.
- The tag system halts when it has less than two symbol.

## See Also

- [Post Tag System](https://wiki.bbchallenge.org/wiki/Post_Tag_System)
