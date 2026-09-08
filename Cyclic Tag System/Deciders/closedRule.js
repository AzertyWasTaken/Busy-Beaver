"use strict";
function isRow(rule, maxLength, totalLength) {
    function checkMod(modulo) {
        for (let i = modulo; i < rule.length; i += totalLength) {
            const symbol = rule[i];
            if (symbol === 1) return 1;
        }
        return 0;
    }

    let count = 0;
    for (let i = 0; i < totalLength; i++) {
        count += checkMod(i);
    }
    return count >= maxLength;
}

export function decClosedRule(code) {
    for (let i = 0; i < code.length; i++) {
        if (code.filter((rule) =>
            isRow(rule, code.length - i, code.length)
        ).length > i) return true;
    }
    return false;
}
