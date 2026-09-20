"use strict";
export function decide(code) {
    const status = code.some((rule, sym) =>
        rule !== null
        && rule.length === 3
        && rule[0] === sym
        && rule[2] === sym
    );

    return [status ? "nonhalting" : "undecided"];
}
