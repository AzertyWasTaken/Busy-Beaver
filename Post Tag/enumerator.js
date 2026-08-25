"use strict";
export function enumerate(maxSize) {
    function* nextRule(currSize, code, symbolCode, recSymbol) {
        if (currSize >= maxSize) {
            code.push(symbolCode);
            yield code;
            code.pop();
            return;
        }

        for (let symbol = 0; symbol <= recSymbol + 1; symbol++) {
            if (symbol === code.length && symbol === symbolCode.at(-1)) continue;
            symbolCode.push(symbol);
            yield* nextRule(currSize + 1, code, symbolCode, Math.max(recSymbol, symbol));
            symbolCode.pop();
        }

        if (code.length + 1 <= recSymbol && symbolCode.length > 0) {
            code.push(symbolCode);
            yield* nextRule(currSize, code, [], recSymbol);
            code.pop();
        }
    }

    return nextRule(0, [], [], 0);
}
