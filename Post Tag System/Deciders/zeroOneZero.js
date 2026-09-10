"use strict";
export function decZeroOneZero(code) {
    return code.some((e, i) => 
        e.length === 3
        && e[0] === i
        && e[2] === i
    )
}
