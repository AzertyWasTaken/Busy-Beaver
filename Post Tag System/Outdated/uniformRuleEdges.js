"use strict";
export function decide(code) {
    const status = code.some((rule, sym) => {
        return rule !== null
        && rule.length >= 2
        && code.every((e) =>
            e[0] === sym
            && e.at(-1) === sym
        );
    });

    return [status ? "nonhalting" : "undecided"];
}
