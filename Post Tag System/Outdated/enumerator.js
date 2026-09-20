"use strict";
export function enumerate(maxSize) {
    const code = [[]];

    function* nextRule(currSize, currSymbol) {
        const rule = code[currSymbol];
        const maxSymbol = code.length - 1;

        // Check if the code is full
        if (currSize >= maxSize) {
            yield [code];
            return;
        }

        // Extend the current production rule
        for (let symbol = 0; symbol <= maxSymbol + 1; symbol++) {
            const newSymbol = symbol > maxSymbol;
            if (newSymbol) code.push([]);

            rule.push(symbol);
            yield* nextRule(currSize + 1, currSymbol);
            rule.pop();

            if (newSymbol) code.pop();
        }

        // Start a new production rule
        if (currSymbol + 1 < code.length) {
            yield* nextRule(currSize, currSymbol + 1);
        }
    }

    return nextRule(0, 0);
}
