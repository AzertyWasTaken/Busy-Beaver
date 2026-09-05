"use strict";
export function newMachine(code, maxSteps) {
    let register = [];
    let state = 0;

    let steps = 0;
    let status = "running";

    function step() {
        if (status !== "running") return;

        // Get current instruction
        const instruction = code?.[state];

        // Check if the machine halted
        if (!instruction) {
            status = "halted";
            return;
        }

        // Update the register machine
        const [type, counter, nextState] = instruction;
        state++;
        if (type === 0) {
            register[counter] = (register[counter] ?? 0) + 1;
        }
        else if ((register[counter] ?? 0) > 0) {
            register[counter] = (register[counter] ?? 0) - 1;
            state = nextState;
        }

        // Increment steps count
        steps++;
        if (steps > maxSteps) status = "timed out";
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
        return {register, state, steps, status};
    }

    return {step, run, getData};
}
