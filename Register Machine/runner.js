"use strict";
export function newProgram(code, maxSteps) {
    const register = [];
    let state = 0;
    let steps = 0;
    let status = "running";
    let stateIdx;
    let prevState;

    function step() {
        if (status !== "running") return;

        // Increment steps count
        steps++;
        if (steps > maxSteps) return status = "timed out";

        // Get current instruction
        const instruction = code[state];
        if (instruction === null) return status = "paused";

        const [type, counter, nextStateA, nextStateB] = instruction;
        const currValue = register[counter] ?? 0;

        // Update the register machine
        prevState = state;

        if (type === 0) {
            register[counter] = currValue + 1;
            state = nextStateA;
            stateIdx = 2;
        } else {
            if (currValue > 0) {
                register[counter] = currValue - 1;
                state = nextStateA;
                stateIdx = 2;
            } else {
                state = nextStateB;
                stateIdx = 3;
            }
        }

        // Check if the machine halted
        if (state === null) return status = "halted";
        return;
    }

    return {
        step,
        register,
        get status() {return status;},
        get steps() {return steps;},
        get state() {return state;},
        get stateIdx() {return stateIdx;},
        get prevState() {return prevState;},
    };
}

export function decide(code, maxSteps) {
    const prog = newProgram(code, maxSteps);
    while (prog.status === "running") prog.step();

    function isPaused() {
        return code.some((instr) => instr === null)
        ? "undecided" : "halted";
    }

    return prog.status === "halted"
    ? [isPaused(), prog.steps]
    : ["undecided"];
}
