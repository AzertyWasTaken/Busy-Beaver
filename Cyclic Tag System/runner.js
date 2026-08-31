"use strict";
export function newTag(code, maxSteps) {
    let string = [1];
    let head = 0;

    let steps = 0;
    let status = "running";

    function step() {
        if (status !== "running") return;

        // Increment steps count
        steps++;
        if (steps > maxSteps) {
            status = "timed out";
            return;
        }

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

        // Check if the system halted
        if (string.length - head < 1) status = "halted";
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
        return {string, head, steps, status};
    }

    return {step, run, getData};
}
