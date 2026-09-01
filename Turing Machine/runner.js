"use strict";
export function newMachine(code, maxSteps) {
    let lTape = [];
    let rTape = [];
    let state = 0;
    let head = 0;

    let steps = 0;
    let status = "running";

    function readCell() {
        return (head < 0 ? lTape[-head - 1] : rTape[head]) ?? 0;
    }

    function setCell(symbol) {
        if (head < 0) {
            lTape[-head - 1] = symbol;
        } else {
            rTape[head] = symbol;
        }
    }

    function step() {
        if (status !== "running") return;

        // Increment steps count
        steps++;
        if (steps > maxSteps) {
            status = "timed out";
            return;
        }

        // Get current instruction
        const symbol = readCell();
        const instruction = code?.[state]?.[symbol];

        // Check if the machine halted
        if (!instruction || instruction.length < 3) {
            status = "halted";
            return;
        }

        // Update the Turing machine
        setCell(instruction[0]);
        head += instruction[1];
        state = instruction[2];
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
        return {lTape, rTape, state, head, steps, status};
    }

    return {readCell, step, run, getData};
}
