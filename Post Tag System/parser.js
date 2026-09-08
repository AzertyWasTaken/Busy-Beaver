"use strict";
export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const statesRules = code.split("_");

    for (let i = 0; i < statesRules.length; i++) {
        parsed.push(Array.from(statesRules[i], (c) =>
            c === "x" ? null : Number(c)
        ));
    }
    return parsed;
}

export function unparse(code) {
    return code.map((symbolCode) =>
        symbolCode.map((str) =>
            typeof str === "number" ? str : "x"
        ).join("")
    ).join("_");
}
