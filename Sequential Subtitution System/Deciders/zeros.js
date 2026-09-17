"use strict";
export function decide(code) {
    function isClosed() {
        for (let i = 0; i < code.length; i++) {
            const [input, output] = code[i];
            if (!output.includes(0)) return false;
            if (input.length === 1 && input[0] === 0) return true;
        }
        return false;
    }
    return {status: isClosed() ? "nonhalting" : "undecided"};
}
