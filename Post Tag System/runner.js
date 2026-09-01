"use strict";
export function newTag(code, maxSteps) {
    let string = [0,0];
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

        // Get current rule
        const symbol = string[head];
        if (typeof symbol !== "number") {
            status = "paused";
            return;
        }

        const rule = code[symbol];
        if (!rule) {
            status = "paused";
            return;
        }

        // Update the tag system
        string.push(...rule);
        head += 2;
        if (head >= 1_000) {
            string.splice(0, head);
            head = 0;
        }

        // Check if the system halted
        if (string.length - head < 2) status = "halted";
        return;
    }

    function run() {
        while (true) {
            step();
            if (status === "halted") return steps;
            if (status === "timed out" || status === "paused") return -1;
        }
    }

    function getData() {
        return {string, head, steps, status};
    }

    return {step, run, getData};
}
