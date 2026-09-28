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

// Check if a sequence was already explored, or lies inside an explored pattern
function isExplored(explored, sequence) {
    return explored.some((pattern) => hasSequence(pattern, sequence));
}

// Replace the symbols of a pattern at the given parity by their production
// rules, splitting at every undefined symbol. Returns null if an expansion
// has less than two symbols, since the pattern can then vanish
function expandParity(pattern, parity, code) {
    const expansions = [];
    let expansion = [];

    for (let index = parity; index < pattern.length; index += 2) {
        const symbol = pattern[index];

        if (symbol === null || code[symbol] === null) {
            if (expansion.length < 2) return null;
            expansions.push(expansion);
            expansion = [];
            continue;
        }

        expansion.push(...code[symbol]);
    }

    if (expansion.length < 2) return null;
    expansions.push(expansion);
    return expansions;
}

// Check if a pattern survives: it is immortal when no expansion reveals a new
// pattern, and it can vanish as soon as an expansion has less than two symbols
function isImmortal(pattern, code, maxDepth) {
    const explored = [pattern];
    let frontier = [pattern];

    while (true) {
        const nextFrontier = [];

        for (const current of frontier) {
            for (let parity = 0; parity < 2; parity++) {
                const expansions = expandParity(current, parity, code);
                if (expansions === null) return false;

                for (const expansion of expansions) {
                    if (!isExplored(explored, expansion))
                        nextFrontier.push(expansion);
                }
            }
        }

        if (nextFrontier.length === 0) return true;
        explored.push(...frontier);
        frontier = nextFrontier;
        if (explored.length > maxDepth) return false;
    }
}

export function decide(code, maxSteps, offset, maxDepth, maxLength) {
    const program = newProgram(code, maxSteps);

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return ["halted", program.steps];
        if (status !== "running") return ["undecided"];

        if (program.steps % offset > 0) continue;

        const queue = program.queue;
        for (let length = 2; length <= Math.min(queue.length, maxLength); length++) {
            for (let start = 0; start <= queue.length - length; start++) {
                const pattern = queue.slice(start, start + length);
                if (isImmortal(pattern, code, maxDepth)) return ["nonhalting"];
            }
        }
    }
}
