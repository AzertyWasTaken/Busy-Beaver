"use strict";
export function decNondecreasing(code) {
    return code.every((rule) => rule.includes(1));
}
