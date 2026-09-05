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

export function decTranslatedCycler(code) {
    const tag = newTag(code, MAX_STEPS);
    while (true) {
        tag.step();
        const status = tag.getData().status;
        if (status === "halted") return true;
        if (status === "timed out" || status === "paused") return false;

        const string = tag.getData().string.slice(tag.getData().head);
        const len = string.length;
        if (len % 2 !== 0) continue;

        const left = string.slice(0, len / 2);
        const right = string.slice(len / 2);

        if (compare(left, right)) {
            for (let i = 0 ; i < len / 2; i++) {
                tag.step();
                const status = tag.getData().status;
                if (status === "halted") return true;
                if (status === "timed out" || status === "paused") return false;
            }

            const nextString = tag.getData().string.slice(tag.getData().head);
            if (
                compare(left, nextString.slice(0, len / 2))
                && compare(left, nextString.slice(len / 2, len))
                && compare(left, nextString.slice(len))
            ) return true;
        }
    }
}
