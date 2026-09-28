"use strict";
export function decide(code) {
    const status = code.every((rule) =>
        rule !== null
        && rule.length >= 2
        && rule.every((symbol) => symbol !== null)
    );

    return [status ? "nonhalting" : "undecided"];
}
