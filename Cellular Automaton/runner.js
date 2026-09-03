"use strict";
export function newAutomaton(code, maxSteps) {
    const symbols = code[0] + 1;
    const ruleSpan = Math.round(Math.log(code.length) / Math.log(symbols));

    let tape = [1];
    let steps = 0;
    let status = "running";
    let currRule;

    function readCell(pos) {
        return tape[pos] ?? 0;
    }

    function removeTrailing(tape) {
        while (tape.length > 0 && (tape.at(-1) ?? 0) === 0) tape.pop();
    }

    function step() {
        if (status !== "running") return;

        // Increment steps count
        steps++;
        if (steps > maxSteps) {
            status = "timed out";
            return;
        }

        const nextTape = [];
        for (let i = 0; i < tape.length + ruleSpan - 1; i++) {
            let idx = 0;
            for (let j = 0; j < ruleSpan; j++) {
                const cell = readCell(i - j);
                idx += symbols**j * cell;
            }

            if (idx === 0) continue;

            const newSymbol = code[idx];
            if (newSymbol === null) {
                status = "halted";
                currRule = idx;
                return;
            }
            nextTape[i] = newSymbol;
        }

        removeTrailing(tape);

        tape = nextTape;
        return;
    }

    function run() {
        while (true) {
            step();
            if (status === "halted") return steps;
            if (status === "timed out") return -1;
        }
    }

    function getData() {
        return {tape, steps, status, currRule};
    }

    return {readCell, step, run, getData};
}
