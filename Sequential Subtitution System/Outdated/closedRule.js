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

// Check if a and b share at least an element
function hasSymbol(a, b) {
    return a.some((sym) => b.includes(sym));
}

export function decide(code) {
    function canDestroyOutput(idx, output) {
        for (let i = 0; i < idx; i++) {
            const input = code[i][0];
            if (hasSymbol(input, output)) return true;
        }
        return false;
    }

    function isClosed() {
        for (let i = 0; i < code.length; i++) {
            const [input, output] = code[i];
            if (
                !canDestroyOutput(i, output)
                && hasSequence(input, output)
            ) return true;
        }
        return false;
    }
    return {status: isClosed() ? "nonhalting" : "undecided"};
}
