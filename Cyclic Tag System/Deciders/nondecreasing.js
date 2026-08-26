"use strict";
export function isNondecreasing(code) {
    return code.every((rule) => rule.includes(1));
}
