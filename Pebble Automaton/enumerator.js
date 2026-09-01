"use strict";
export function enumerate(maxSize) {
    function* nextRule(currSize, code) {
        // Check if the code is full
        if (currSize >= maxSize) {
            yield code;
            return;
        }

        // Append the rule
        for (let l = 0; l <= currSize + 1; l++) {
            for (let r = 0; r <= currSize - l + 1; r++) {
                code.push([l, r]);
                yield* nextRule(currSize + 1, code);
                code.pop();
            }
        }
    }

    return nextRule(0, []);
}
