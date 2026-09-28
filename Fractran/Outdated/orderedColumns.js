"use strict";
function isUnknown(value) {
    return value === "positive" || value === "negative";
}

function rankValue(a, b) {
    const minA = a === "positive" ? 1
    : a === "negative" ? -Infinity : a;

    const maxB = b === "positive" ? Infinity
    : b === "negative" ? -1 : b;

    return minA > maxB;
}

export function decide(code) {
    const maxRow = Math.max(...code.map((r) => r.length));

    for (let cIdx = 2; cIdx < maxRow; cIdx++) {
        for (let rIdx = 0; rIdx < code.length; rIdx++) {
            const leftVal = code[rIdx][cIdx - 1] ?? 0;
            const rightVal = code[rIdx][cIdx] ?? 0;

            if (leftVal === rightVal && !isUnknown(leftVal)) continue;
            if (rankValue(leftVal, rightVal)) return ["equivalent"];
            break;
        }
    }

    return ["undecided"];
}
