"use strict";
export function newMachine(code, maxSteps) {
    let state = 0;
    let tape = [];
    let pointer = 0;
    let steps = 0;

    function step() {
        // Increment steps count
        steps++;
        if (steps > maxSteps) return "timed out";

        // Get current instruction
        const symbol = tape[pointer] ?? 0;
        const instruction = code?.[state]?.[symbol];
        if (!instruction || instruction.length < 3) return "halted";

        // Update the Turing machine
        tape[pointer] = instruction[0];
        pointer += instruction[1];
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
        return {state, symbol: tape[pointer] ?? 0};
    }

    return {step, run, getData};
}
