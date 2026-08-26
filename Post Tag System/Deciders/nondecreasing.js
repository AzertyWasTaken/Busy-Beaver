"use strict";
export function isNondecreasing(code) {
    return code.every((rule) =>
        rule.length >= 2
        && !rule.includes(code.length)
    );
}
