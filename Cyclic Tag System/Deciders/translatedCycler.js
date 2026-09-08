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

function compareChunks(a) {
    for (let i = 1; i < a.length; i++) {
        if (!compare(a[0], a[i])) return false;
    }
    return true;
}

function chunk(arr, len) {
    const res = [];
    while (arr.length >= len) {
        res.push(arr.splice(0, len));
    }
    res.push(arr);
    return res;
}

export function decTranslatedCycler(code) {
    const tag = newTag(code, MAX_STEPS);
    let period = 1;

    while (true) {
        tag.step();
        const status = tag.getData().status;
        if (status === "halted") return true;
        if (status === "timed out" || status === "paused") return false;

        const string = tag.getData().string.slice(tag.getData().head);
        const strLen = string.length;
        const remainder = strLen % (code.length * period);
        const chunks = chunk([...string], code.length * period);

        if (chunks.length > 1 && compareChunks(chunks.slice(0, -1))) {
            for (let i = 0 ; i < strLen - remainder; i++) {
                tag.step();
                const status = tag.getData().status;
                if (status === "halted") return true;
                if (status === "timed out" || status === "paused") return false;
            }

            const nextString = tag.getData().string.slice(tag.getData().head);
            const nextChunks = chunk([...nextString], code.length * period);
            // console.log(chunks, nextChunks, tag.getData().steps);

            if (
                compare(chunks.at(-1), nextChunks.at(-1))
                && compare(chunks[0], nextChunks[0])
                && compareChunks(nextChunks.slice(0, -1))
            ) return true;
        }

        const steps = tag.getData().steps;
        period = Math.ceil(steps / 16);
    }
}
