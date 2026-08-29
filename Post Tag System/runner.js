"use strict";
export function newTag(code, maxSteps) {
    let string = [0,0];
    let head = 0;
    let steps = 0;

    function step() {
        // Increment steps count
        steps++;
        if (steps > maxSteps) return "timed out";

        // Get current rule
        const symbol = string[head];
        const rule = code[symbol] ?? [];

        // Update the tag system
        string.push(...rule);
        head += 2;
        if (head >= 1_000) {
            string.splice(0, head);
            head = 0;
        }

        if (string.length - head < 2) return "halted";
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
        return {string, head, steps};
    }

    return {step, run, getData};
}
