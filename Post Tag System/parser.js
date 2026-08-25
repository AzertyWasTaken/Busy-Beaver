"use strict";
export function parse(ruleset) {
    const parsed = [];
    const statesRules = ruleset.split("_");

    for (let i = 0; i < statesRules.length; i++) {
        parsed.push(Array.from(statesRules[i]));
    }
    return parsed;
}

export function unparse(code) {
    return code.map((symbolCode) => symbolCode.join("")).join("_");
}
