"use strict";
import {newTag} from "../runner.js";

const MAX_STEPS = 1_000;

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function decCycler(code) {
    const tag = newTag(code, MAX_STEPS);
    let prevString;
    let phase = 1;

    while (true) {
        tag.step();
        const status = tag.getData().status;
        if (status === "halted") return true;
        if (status === "timed out" || status === "paused") return false;

        const {string, head, steps} = tag.getData();
        const slice = string.slice(head);

        if (prevString && compare(prevString, slice))
            return true;

        if (steps >= 2**phase) {
            prevString = slice;
            phase++;
        }
    }
}
