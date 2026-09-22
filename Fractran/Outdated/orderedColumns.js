"use strict";
export function decide(code) {
    const maxRow = Math.max(...code.map((r) => r.length));

    for (let cIdx = 2; cIdx < maxRow; cIdx++) {
        for (let rIdx = 0; rIdx < code.length; rIdx++) {
            const rightVal = (code[rIdx][cIdx] ?? 0);
            const leftVal = (code[rIdx][cIdx - 1] ?? 0);

            if (leftVal === rightVal) continue;

            if (
                leftVal === 0
                || rightVal !== 0 && leftVal > rightVal
            ) return ["equivalent"];

            break;
        }
    }

    return ["undecided"];
}
