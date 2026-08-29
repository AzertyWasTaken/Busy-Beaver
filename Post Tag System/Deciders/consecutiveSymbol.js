"use strict";
function isRow(symbolCode, state, code) {
    for (let i = 1 ; i < symbolCode.length; i++) {
        const symbol = symbolCode[i];
        if (symbol !== symbolCode[i - 1]) continue;
        if (state.has(symbol)) return true;

        state.add(symbol);
        if (isRow(code[symbol] ?? [], state, code)) return true;
        state.delete(symbol);
    }
    return false;
}

export function decConsecutiveSymbol(code) {
    return code.some((symbolCode, symbol) =>
        isRow(symbolCode, new Set([symbol]), code)
    );
}
