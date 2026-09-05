"use strict";
export function decNondecreasing(code) {
    return code.every((rule) =>
        rule.length >= 2
        && rule.every((symbol) => typeof symbol === "number")
    );
}
