"use strict";
function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function decIdenticalRule(code) {
    for (let min = 0; min < code.length; min++) {
        if (code[min].includes(code.length + 1)) return true;

        for (let max = min + 1; max < code.length; max++) {
            if (compare(code[min], code[max])) return true;
        }
    }
    return false;
}
