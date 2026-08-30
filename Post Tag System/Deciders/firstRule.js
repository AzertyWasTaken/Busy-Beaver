"use strict";
export function decFirstRule(code) {
    return code[0].length === 2
    && code[0][0] === 1
    && code[0][1] === 1;
}
