"use strict";
import {newProgram} from "../runner.js";

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function decide(code, maxSteps) {
    const program = newProgram(code, maxSteps);

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return ["halted", program.steps];
        if (status !== "running") return ["undecided"];

        const queue = program.queue;
        const length = queue.length;
        const half = Math.floor(length / 2);
        const remainder = length % 2;
        if (half === 0) continue;

        const left = queue.slice(0, half);
        const right = queue.slice(half, half * 2);
        if (!compare(left, right)) continue;

        for (let i = 0 ; i < half; i++) {
            program.step();
            const status = program.status;
            if (status === "halted") return ["halted", program.steps];
            if (status !== "running") return ["undecided"];
        }

        const nextQueue = program.queue;
        const nextLength = nextQueue.length;
        const nextRemainder = nextLength % 2;

        function isCycling() {
            if (nextLength < length) return false;

            if (!compare(
                queue.slice(queue.length - remainder),
                nextQueue.slice(nextQueue.length - nextRemainder)
            )) return false;

            for (let idx = 0; idx < nextLength - nextRemainder; idx += half) {
                const chunk = nextQueue.slice(idx, idx + half);
                if (!compare(left, chunk)) return false;
            }
            return true;
        }

        if (isCycling()) return ["nonhalting"];
    }
}
