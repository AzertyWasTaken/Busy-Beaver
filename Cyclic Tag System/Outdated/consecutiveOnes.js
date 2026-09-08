"use strict";
function isRow(rule, maxLength) {
    let count = 0;
    for (let i = 0; i < rule.length; i++) {
        const symbol = rule[i];
        if (symbol === 1) {
            count++;
            if (count >= maxLength) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

export function decConsecutiveOnes(code) {
    return code.some((rule) =>
        isRow(rule, code.length)
    );
}
