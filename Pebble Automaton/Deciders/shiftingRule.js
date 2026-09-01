"use strict";
export function decShiftingRule(code) {
    const [left, right] = code.at(-1);
    return left === code.length || right === code.length;
}
