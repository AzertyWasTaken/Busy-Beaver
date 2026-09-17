"use strict";
const INPUT = 0;
const OUTPUT = 1;

export function enumerate(maxSize) {
    const code = [[[],[]]];

    function* nextRule(currSize, side, recSymbol) {
        if (currSize >= maxSize) {
            yield code;
            return;
        }

        const rule = code.at(-1);
        const ruleSide = rule[side];

        // Extend the current production rule
        for (let symbol = 0; symbol <= recSymbol + 1; symbol++) {
            ruleSide.push(symbol);
            yield* nextRule(currSize + 1, side, Math.max(recSymbol, symbol));
            ruleSide.pop();
        }

        // Go to output
        if (side === INPUT && ruleSide.length > 0) {
            yield* nextRule(currSize, OUTPUT, recSymbol);
        }

        // Start a new production rule
        if (side === OUTPUT) {
            code.push([[],[]]);
            yield* nextRule(currSize, INPUT, recSymbol);
            code.pop();
        }
    }

    return nextRule(0, INPUT, 0);
}
