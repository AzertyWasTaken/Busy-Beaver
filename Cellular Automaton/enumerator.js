"use strict";
export function enumerate(maxSymbol, maxSize) {
    function* nextRule(currIdx, code, hasHalt) {
        // Check if the code is full
        if (currIdx >= maxSymbol**maxSize) {
            if (hasHalt) yield code;
            return;
        }

        // Append the rule
        for (let i = 0; i < maxSymbol; i++) {
            code.push(i);
            yield* nextRule(currIdx + 1, code, hasHalt);
            code.pop();
        }

        // Check if an halting transition can be added
        if (!hasHalt) {
            code.push(null);
            yield* nextRule(currIdx + 1, code, true);
            code.pop();
        }
    }

    return nextRule(1, [maxSymbol - 1], false);
}
