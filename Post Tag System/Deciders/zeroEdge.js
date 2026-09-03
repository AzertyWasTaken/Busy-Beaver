"use strict";
export function decZeroEdge(code) {
    return code.every((rule) =>
        rule[0] === 0
        && rule.at(-1) === 0
    );
}
