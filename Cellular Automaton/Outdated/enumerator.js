"use strict";
export function enumerate(maxSymbol, maxSize) {
    const code = [maxSymbol - 1];

    function* nextRule(hasHalt) {
        // Check if the code is full
        if (code.length >= maxSymbol**maxSize) {
            if (hasHalt) yield [code];
            return;
        }

        // Append the rule
        for (let i = 0; i < maxSymbol; i++) {
            code.push(i);
            yield* nextRule(hasHalt);
            code.pop();
        }

        // Check if an halting transition can be added
        if (!hasHalt) {
            code.push(null);
            yield* nextRule(true);
            code.pop();
        }
    }

    return nextRule(false);
}
