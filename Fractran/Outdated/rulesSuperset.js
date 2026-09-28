"use strict";
// Check if rule b can be reached if rule a is placed before it.
function override(a, b) {
    const maxLength = Math.max(a.length, b.length);
    for (let i = 0; i < maxLength; i++) {
        const upVal = a[i] ?? 0;
        const downVal = b[i] ?? 0;

        if (upVal === "positive") continue;
        if (upVal === "negative") return false;

        if (upVal >= 0) continue;
        if (downVal === "positive" || downVal === "negative") return false;
        if (upVal < downVal || downVal >= 0) return false;
    }
    return true;
}

export function decide(code) {
    const status = code.some((rule, a) => {
        for (let b = 0; b < a; b++) {
            if (override(code[b], rule)) return true;
        }
        return false;
    });

    return [status ? "equivalent" : "undecided"];
}
