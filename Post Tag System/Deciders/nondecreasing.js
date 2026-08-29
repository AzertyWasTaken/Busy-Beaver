"use strict";
export function decNondecreasing(code) {
    return code.every((rule) =>
        rule.length >= 2
        && !rule.includes(code.length)
    );
}
