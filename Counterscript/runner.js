"use strict";
export function newMachine(code, maxSteps) {
    let register = [];
    let state = 0;

    let steps = 0;
    let iterations = 0;
    let status = "running";

    function findClosingBracket() {
        let stack = 0;
        for (let index = state + 1; index < code.length; index++) {
            const element = code[index];
            if (element === null) continue;

            if (element[0] === 2) {
                stack++;
            }
            else if (element[0] === 3) {
                if (stack === 0) return index;
                stack--;
            }
        }
    }

    function findOpeningBracket() {
        let stack = 0;
        for (let index = state - 1; index >= 0; index--) {
            const element = code[index];
            if (element === null) continue;

            if (element[0] === 3) {
                stack++;
            }
            else if (element[0] === 2) {
                if (stack === 0) return index;
                stack--;
            }
        }
    }

    function step() {
        if (status !== "running") return;

        // Check if the machine halted
        if (state >= code.length) {
            status = "halted";
            return;
        }

        // Get current instruction
        const instruction = code[state];
        if (instruction === null) {
            status = "paused";
            return;
        }

        const [type, counter] = instruction;

        // Update the register machine
        switch (type) {
            case 0:
                register[counter] = (register[counter] ?? 0) + 1;
                steps++;
                break;
            case 1:
                register[counter] = Math.max((register[counter] ?? 0) - 1, 0);
                steps++;
                break;
            case 2:
                if ((register[counter] ?? 0) === 0) state = findClosingBracket();
                break;
            case 3:
                if ((register[counter] ?? 0) > 0) state = findOpeningBracket();
                iterations++;
                break;
        }

        state++;

        // Increment steps count
        if (iterations > maxSteps) status = "timed out";
        return;
    }

    function run() {
        while (true) {
            step();
            if (status === "halted") return steps;
            if (status === "timed out" || status === "paused") return -1;
        }
    }

    function getData() {
        return {register, state, steps, iterations, status};
    }

    return {step, run, getData};
}
