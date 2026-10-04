"use strict";
// Check if a appears as an exact consecutive sequence inside b
function hasSequence(a, b) {
    for (let start = 0; start <= b.length - a.length; start++) {
        let match = true;

        for (let offset = 0; offset < a.length; offset++) {
            if (a[offset] !== b[start + offset]) {
                match = false;
                break;
            }
        }

        if (match) return true;
    }

    return false;
}

export function decide(code) {
    const status = hasSequence(code[0][0], code[0][1]);
    return [status ? "nonhalting" : "undecided"];
}
