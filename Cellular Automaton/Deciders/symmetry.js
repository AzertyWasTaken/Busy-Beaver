"use strict";
export function decSymmetry(code) {
    const symbols = code[0] + 1;
    const ruleSpan = Math.round(Math.log(code.length) / Math.log(symbols));
    return code[symbols**(ruleSpan - 1)] > code[1];
}
