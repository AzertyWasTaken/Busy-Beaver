"use strict";
export function newTag(code, maxSteps) {
    let string = [0,0];
    let steps = 0;

    function step() {
        // Increment steps count
        steps++;
        if (steps > maxSteps) return "timed out";

        // Get current rule
        const symbol = string[0];
        const rule = code[symbol] ?? [];

        // Update the tag system
        string.splice(0, 2);
        string.push(...rule);
        if (string.length < 2) return "halted";

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
        return {string, steps};
    }

    return {step, run, getData};
}
