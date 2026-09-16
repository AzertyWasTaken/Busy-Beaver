"use strict";
function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i] || a[i] === null) return false;
    }
    return true;
}

export function decide(code) {
    for (let a = 0; a < code.length; a++) {
        if (code[a] === null) continue;

        for (let b = a + 1; b < code.length; b++) {
            if (code[b] === null) continue;

            if (compare(code[a], code[b])) return {status: "equivalent"};
        }
    }
    return {status: "undecided"};
}
