"use strict";
export function newAutomaton(code, maxSteps) {
    let lTape = [code.length];
    let rTape = [];

    let steps = 0;
    let status = "running";

    function readCell(pos) {
        return (pos < 0 ? lTape[-pos - 1] : rTape[pos]) ?? 0;
    }

    function compare(a, b) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if ((a[i] ?? 0) !== (b[i] ?? 0)) return false;
        }
        return true;
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

        const nextLTape = [];
        const nextRTape = [];

        for (let i = 0; i < lTape.length; i++) {
            const cell = readCell(-i - 1);
            if (cell === 0) continue;

            const [addLeft, addRight] = code[cell - 1];
            if (i === 0) {
                nextRTape[0] = (nextRTape[0] ?? 0) + addRight;
            } else {
                nextLTape[i - 1] = (nextLTape[i - 1] ?? 0) + addRight;
            }
            nextLTape[i] = (nextLTape[i] ?? 0) + cell - addLeft - addRight;
            nextLTape[i + 1] = (nextLTape[i + 1] ?? 0) + addLeft;
        }

        for (let i = 0; i < rTape.length; i++) {
            const cell = readCell(i);
            if (cell === 0) continue;

            const [addLeft, addRight] = code[cell - 1];
            if (i === 0) {
                nextLTape[0] = (nextLTape[0] ?? 0) + addLeft;
            } else {
                nextRTape[i - 1] = (nextRTape[i - 1] ?? 0) + addLeft;
            }
            nextRTape[i] = (nextRTape[i] ?? 0) + cell - addLeft - addRight;
            nextRTape[i + 1] = (nextRTape[i + 1] ?? 0) + addRight;
        }

        removeTrailing(nextLTape);
        removeTrailing(nextRTape);

        if (compare(lTape, nextLTape) && compare(rTape, nextRTape)) {
            status = "halted";
            return;
        }

        lTape = nextLTape;
        rTape = nextRTape;
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
        return {lTape, rTape, steps, status};
    }

    return {readCell, step, run, getData};
}
