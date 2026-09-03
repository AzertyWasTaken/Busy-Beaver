"use strict";
export function enumerate(maxSize) {
    function* nextRule(currSize, code, symbolCode, recSymbol) {
        // Check if the code is full
        if (currSize >= maxSize) {
            code.push(symbolCode);

            const missingRules = recSymbol + 1 - code.length;
            for (let i = 0; i < missingRules; i++) code.push([]);
            yield code;
            for (let i = 0; i < missingRules; i++) code.pop();

            code.pop();
            return;
        }

        // Extend the current production rule
        for (let symbol = 0; symbol <= recSymbol + 1; symbol++) {
            symbolCode.push(symbol);
            yield* nextRule(currSize + 1, code, symbolCode, Math.max(recSymbol, symbol));
            symbolCode.pop();
        }

        // Start a new production rule
        if (code.length + 1 <= recSymbol) {
            code.push(symbolCode);
            yield* nextRule(currSize, code, [], recSymbol);
            code.pop();
        }
    }

    return nextRule(0, [], [], 0);
}
