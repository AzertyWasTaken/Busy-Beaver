"use strict";
export function newTag(code, maxSteps) {
    let string = [1];
    let steps = 0;

    function step() {
        // Increment steps count
        steps++;
        if (steps > maxSteps) return "timed out";

        // Update the tag system
        const bit = string.shift();
        if (bit === 1) {
            const rule = code[(steps - 1) % code.length];
            string.push(...rule);
        }

        if (string.length === 0) return "halted";
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
