"use strict";
import {newTag} from "../runner.js";

const MAX_PERIOD = 10;
const MAX_STEPS = 1_000;

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function isCycler(code) {
    const tag = newTag(code, MAX_STEPS);
    let history = [];

    while (true) {
        for (let i = 0; i < code.length; i++) {
            const status = tag.step();
            if (status === "halted") return true;
            if (status === "timed out") return false;
        }

        const currString = tag.getData().string;
        if (history.some((str) => compare(str, currString)))
            return true;

        history.push([...currString]);
        if (history.length > MAX_PERIOD) history.shift();
    }
}
