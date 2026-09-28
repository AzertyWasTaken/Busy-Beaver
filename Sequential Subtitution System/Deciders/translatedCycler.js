"use strict";
import {newProgram} from "../runner.js";

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

        if (match) return true;
    }

    return false;
}

function compare(a, b, start, end, offset) {
    for (let i = start; i < end; i++) {
        if (a[i] !== b[i + offset]) return false;
    }
    return true;
}

export function decide(code, maxSteps) {
    const maxInputLength = Math.max(...code.map((rule) => rule[0].length));
    const program = newProgram(code, maxSteps);

    let prevString;
    let prevIndex;
    let prevRule;

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return ["halted", program.steps];
        if (status !== "running") return ["undecided"];

        const [rule, index] = program.state;
        const string = program.string;

        if (
            prevString
            && prevRule === rule
            && hasSequence(rule[0], rule[1])
            && compare(
                prevString,
                string,
                prevIndex - maxInputLength + 1,
                prevIndex + prevRule[1].length + maxInputLength - 1,
                index - prevIndex
            )
        ) return ["nonhalting"];

        prevString = [...string];
        prevIndex = index
        prevRule = rule;
    }
}
