"use strict";
// Check if a appears as an exact consecutive sequence inside b
function hasSequence(a, b) {
    for (let start = 0; start <= b.length - a.length; start++) {
        let match = true;

        for (let offset = 0; offset < a.length; offset++) {
            if (a[offset] !== b[start + offset]) {
                match = false;
                break;
            }
        }

        if (match) return start;
    }

    return null;
}

export function newProgram(code, maxSteps) {
    const string = [0];
    let steps = 0;
    let status = "running";
    let state;

    function getRule() {
        for (let idx = 0; idx < code.length; idx++) {
            const rule = code[idx];
            const index = hasSequence(rule[0], string);
            if (index !== null) return [rule, index];
        }
        return null;
    }

    function step() {
        if (status !== "running") return status;

        // Get current rule
        state = getRule();
        if (state === null) return status = "halted";

        // Update the tag system
        const [[input, output], index] = state;
        string.splice(index, input.length, ...output);

        // Increment steps count
        steps++;
        if (steps > maxSteps) return status = "timed out";
        return status;
    }

    return {
        step,
        string,
        get steps() {return steps;},
        get status() {return status;},
        get state() {return state;},
    };
}

export function decide(code, maxSteps) {
    const prog = newProgram(code, maxSteps);
    while (prog.status === "running") prog.step();

    return {
        status: prog.status === "halted" ? "halted" : "undecided",
        steps: prog.steps
    };
}
