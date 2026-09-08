"use strict";
export function decZeroOneZero(code) {
    return code[0].length === 3
    && code[0][0] === 0
    && code[0][1] === 1
    && code[0][2] === 0;
}
