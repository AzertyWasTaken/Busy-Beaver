"use strict";
export function enumerate(maxSize) {
    function* nextRule(currSize, code, prodRule) {
        // Check if the code is full
        if (currSize >= maxSize) {
            code.push(prodRule);
            yield code;
            code.pop();
            return;
        }

        // Extend the current production rule
        for (let bit = 0; bit < 2; bit++) {
            prodRule.push(bit);
            yield* nextRule(currSize + 1, code, prodRule);
            prodRule.pop();
        }

        // Start a new production rule
        code.push(prodRule);
        yield* nextRule(currSize + 1, code, []);
        code.pop();
    }

    return nextRule(1, [], []);
}
