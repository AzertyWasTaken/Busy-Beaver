"use strict";
export function decide(code) {
    const symbols = code[0] + 1;
    const ruleSpan = Math.round(Math.log(code.length) / Math.log(symbols));
    for (let a = 0, b = ruleSpan - 1; a < b; a++, b--) {
        if (code[symbols**a] < code[symbols**b]) return ["equivalent"];
    }
    return ["undecided"];
}
