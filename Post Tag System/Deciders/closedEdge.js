"use strict";
export function decClosedEdge(code) {
    function isClosed(symbol) {
        return code[symbol].length >= 2
        && code.every((rule) =>
            rule[0] === symbol
            && rule.at(-1) === symbol
        );
    }

    for (let symbol = 0; symbol < code.length; symbol++) {
        if (isClosed(symbol)) return true;
    }
    return false;
}
