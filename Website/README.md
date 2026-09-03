# Website

The repository includes a website with browser simulators for each system.

Each simulator page imports the parser and runner of its system folder, so the simulators behave exactly like the research code.

## Pages

- [Turing Machine](./turing-machine.html)
- [Post Tag System](./post-tag-system.html)
- [Cyclic Tag System](./cyclic-tag-system.html)
- [Pebble Automaton](./pebble-automaton.html)

Shared modules:

- `canvas.js` — draws the space-time diagram row by row.
- `colors.js` — the colors used for symbols and states.

## Running

- The pages import the system modules with relative paths, so the website must be served from the repository root, for example with `npx serve .` or `python -m http.server`.
- Opening the pages directly from the file system does not work, because browsers block module imports on `file://` pages.

## Usage

- Paste a program in the standard format and press **Import**. It is the same format as the holdout files, defined by each system's `parser.js` and documented in its `spec.md`.
- Whitespace in the input is ignored, and importing an empty input resets the canvas.
- The canvas shows the space-time diagram: each row is one step, and colors encode the symbols and the current state.
- Scroll with the mouse wheel: rows are simulated lazily as you scroll, up to 1,000,000 steps.
- Zoom with the **-** and **+** buttons: they change the cell size of the diagram, and the scroll speed adapts so one wheel tick always scrolls the same distance.
- The **Offset** toggle (Post Tag System and Cyclic Tag System pages) shifts each row horizontally at each step.
