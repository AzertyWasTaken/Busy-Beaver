"use strict";
function override(a, b) {
    const maxLength = Math.max(a.length, b.length);
    for (let i = 0; i < maxLength; i++) {
        const [up, down] = [a[i] ?? 0, b[i] ?? 0];
        if (up < 0 && (up < down || down >= 0)) return false;
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
