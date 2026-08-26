"use strict";
export function newMachine(code, maxSteps) {
    let lTape = [];
    let rTape = [];

    let state = 0;
    let head = 0;
    let steps = 0;

    function readCell() {
        return (head < 0 ? lTape[-head - 1] : rTape[head]) ?? 0;
    }

    function readInstruction() {
        const symbol = readCell();
        return code?.[state]?.[symbol];
    }

    function setCell(symbol) {
        if (head < 0) {
            lTape[-head - 1] = symbol;
        } else {
            rTape[head] = symbol;
        }
    }

    function step() {
        // Increment steps count
        steps++;
        if (steps > maxSteps) return "timed out";

        // Get current instruction
        const instruction = readInstruction();
        if (!instruction || instruction.length < 3) return "halted";

        // Update the Turing machine
        setCell(instruction[0]);
        head += instruction[1];
        state = instruction[2];

        return "running";
    }

    function run() {
        while (true) {
            const status = step();
            if (status === "halted") return steps;
            if (status === "timed out") return -1;
        }
    }

    function getData() {
        return {lTape, rTape, state, head, steps};
    }

    return {readCell, readInstruction, step, run, getData};
}
