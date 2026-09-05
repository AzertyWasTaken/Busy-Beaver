"use strict";
function isClosed(rule, symbolSet, code) {
    function checkPart(modulo) {
        for (let i = modulo; i < rule.length; i += 2) {
            const symbol = rule[i];
            if (typeof symbol !== "number") continue;
            if (symbolSet.has(symbol)) return true;

            symbolSet.add(symbol);
            if (isClosed(code[symbol] ?? [], symbolSet, code)) {
                symbolSet.delete(symbol);
                return true;
            }
            symbolSet.delete(symbol);
        }
        return false;
    }

    return checkPart(0) && checkPart(1);
}

export function decCyclicClosedRule(code) {
    return code.some((rule, symbol) =>
        isClosed(rule, new Set([symbol]), code)
    );
}
