"use strict";
export function run(ruleset, maxSteps = 100) {
    let state = 0;
    let tape = [];
    let pointer = 0;
    let steps = 0;

    while (true) {
        steps++;
        if (steps > maxSteps) return -1;

        const symbol = tape[pointer] ?? 0;
        const instruction = ruleset?.[state]?.[symbol];
        if (!instruction || instruction.length < 3)
            return steps;

        tape[pointer] = instruction[0];
        pointer += instruction[1];
        state = instruction[2];
    }
}
