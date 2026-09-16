"use strict";
export function newProgram(code, maxSteps) {
    const queue = [0,0];
    let head = 0;
    let steps = 0;
    let status = "running";

    function step() {
        if (status !== "running") return status;

        // Get current rule
        const symbol = queue[head];
        if (symbol === null) return status = "paused";

        const rule = code[symbol];
        if (rule === null) return status = "paused";

        const queueLength = queue.length - head;
        if (rule[queueLength % 2] === null) return status = "paused";

        // Update the tag system
        queue.push(...rule);
        head += 2;
        if (head >= 1_000) {
            queue.splice(0, head);
            head = 0;
        }

        // Check if the system halted
        if (queue.length - head < 1) return status = "halted";

        // Increment steps count
        steps++;
        if (steps > maxSteps) return status = "timed out";
        return status;
    }

    return {
        step,
        get head() {return head;},
        get steps() {return steps;},
        get status() {return status;},
        get symbol() {return queue[head];},
        get queue() {return queue.slice(head);},
        get queueLength() {return queue.length - head;},
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
