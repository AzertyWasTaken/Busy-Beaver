# AGENTS

These rules apply to all code and documentation in this repository.

## Behavior and API stability

- Preserve all existing behavior and functionality.
- Do not change public APIs, exported names, function signatures, data formats, or externally observable behavior.
- Do not implement backward compatibility.

## Code quality

- Remove unnecessary complexity, duplication, dead code, redundant logic, and misleading or poor naming.
- Improve naming where it makes the code clearer, but do not rename public APIs unless absolutely necessary.
- Follow modern JavaScript best practices when they improve readability or maintainability without changing behavior.
- Do not introduce unnecessary abstractions, helper functions, dependencies, or architectural changes.

## Comments

- Improve existing comments when they are unclear, inaccurate, outdated, or misleading.
- Do not add JSDoc comments.
- Do not add long or multiline comments unless absolutely necessary.

## Changes

- Keep the changes focused and minimal.
- Do not make unrelated changes.

## Documentation

Read the relevant documentation before making changes:

- Root `README.md`, `CONTRIBUTING.md` and `conventions.md`.
- Each system's `spec.md`, `search.md`, `results.md` and `TODO.md`.
- `Website/README.md`.

Keep the documentation in sync with the code:

- Update a system's `results.md` when its results change.
- Update its `search.md` when its deciders change.
- Update its `spec.md` when its definition changes.
- Update its `TODO.md` when its remaining work changes.
- Update the root `stats.md` when code is added or moved.
