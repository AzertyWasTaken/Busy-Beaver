"use strict";
export function newMachine(code, maxSteps) {
    let lTape = [];
    let rTape = [];
    let state = 0;
    let head = 0;

    let steps = 0;
    let iterations = 0;
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

    function findClosingBracket() {
        let stack = 0;
        for (let index = state + 1; index < code.length; index++) {
            const element = code[index];
            if (element === 4) {
                stack++;
            }
            else if (element === 5) {
                if (stack === 0) return index;
                stack--;
            }
        }
    }

    function findOpeningBracket() {
        let stack = 0;
        for (let index = state - 1; index >= 0; index--) {
            const element = code[index];
            if (element === 5) {
                stack++;
            }
            else if (element === 4) {
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

        // Update the register machine
        switch (instruction) {
            case 0:
                setCell(1);
                steps++;
                break;
            case 1:
                setCell(0);
                steps++;
                break;
            case 2:
                head++;
                steps++;
                break;
            case 3:
                head--;
                steps++;
                break;
            case 4:
                if (readCell() === 0) state = findClosingBracket();
                break;
            case 5:
                if (readCell() === 1) state = findOpeningBracket();
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
            if (status === "timed out") return -1;
        }
    }

    function getData() {
        return {lTape, rTape, state, head, steps, status};
    }

    return {step, run, getData};
}
