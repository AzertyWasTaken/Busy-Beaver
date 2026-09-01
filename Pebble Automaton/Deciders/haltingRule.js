"use strict";
export function decHaltingRule(code) {
    return code.every(([left, right]) =>
        left > 0 || right > 0
    );
}
