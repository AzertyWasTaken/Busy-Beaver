"use strict";
export function decSymmetry(code) {
    const [left, right] = code.at(-1);
    return left > right;
}
