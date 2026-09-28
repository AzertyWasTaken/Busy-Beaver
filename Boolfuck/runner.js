"use strict";
const FLIP = 0;
const MOVE_RIGHT = 1;
const MOVE_LEFT = 2;
const LOOP_OPEN = 3;
const LOOP_CLOSE = 4;

export function newProgram(code, maxSteps) {
    const lTape = [];
    const rTape = [];
    let state = 0;
    let head = 0;

    let steps = 0;
    let iterations = 0;
    let status = "running";

    const cache = [];

    function readCell() {
        return (head < 0 ? lTape[-head - 1] : rTape[head]) ?? 0;
    }

    function toggleCell() {
        const value = 1 - readCell();
        if (head < 0) {
            lTape[-head - 1] = value;
        } else {
            rTape[head] = value;
        }
    }

    function findClosingBracket() {
        const cacheValue = cache[state];
        if (cacheValue) return cacheValue;

        let stack = 0;
        for (let index = state + 1; index < code.length; index++) {
            const element = code[index];
            if (element === LOOP_OPEN) {
                stack++;
            }
            else if (element === LOOP_CLOSE) {
                if (stack === 0) {
                    cache[state] = index;
                    return index;
                }
                stack--;
            }
        }
    }

    function findOpeningBracket() {
        const cacheValue = cache[state];
        if (cacheValue) return cacheValue;

        let stack = 0;
        for (let index = state - 1; index >= 0; index--) {
            const element = code[index];
            if (element === LOOP_CLOSE) {
                stack++;
            }
            else if (element === LOOP_OPEN) {
                if (stack === 0) {
                    cache[state] = index;
                    return index;
                }
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
            case FLIP:
                toggleCell();
                steps++;
                break;
            case MOVE_RIGHT:
                head++;
                steps++;
                break;
            case MOVE_LEFT:
                head--;
                steps++;
                break;
            case LOOP_OPEN:
                if (readCell() === 0) state = findClosingBracket();
                break;
            case LOOP_CLOSE:
                if (readCell() === 1) state = findOpeningBracket();
                iterations++;
                break;
        }

        state++;

        // Increment steps count
        if (iterations > maxSteps) status = "timed out";
        return;
    }

    return {
        step,
        get status() {return status;},
        get steps() {return steps;},
        get state() {return state;},
        get head() {return head;},
        get tape() {return [...lTape.toReversed(), ...rTape];},
        get offset() {return lTape.length;},
        get isRecord() {
            return head < 0
            ? head <= -lTape.length - 1
            : head >= rTape.length;
        },
    };
}

export function decide(code, maxSteps) {
    const prog = newProgram(code, maxSteps);
    while (prog.status === "running") prog.step();

    return prog.status === "halted"
    ? ["halted", prog.steps]
    : ["undecided"];
}
