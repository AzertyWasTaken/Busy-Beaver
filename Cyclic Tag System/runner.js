"use strict";
export function newTag(code, maxSteps) {
    let string = [1];
    let head = 0;
    let steps = 0;

    function step() {
        // Increment steps count
        steps++;
        if (steps > maxSteps) return "timed out";

        // Append the next production rule
        if (string[head] === 1) {
            const rule = code[(steps - 1) % code.length];
            string.push(...rule);
        }

        // Remove the first item
        head++;
        if (head >= 1_000) {
            string.splice(0, head);
            head = 0;
        }

        if (string.length - head < 1) return "halted";
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
