"use strict";
export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const statesRules = code.split("_");

    for (let i = 0; i < statesRules.length; i++) {
        parsed.push(Array.from(statesRules[i], (char) =>
            /[a-zA-Z]/.test(char)
            ? -(char.charCodeAt(0) - 64)
            : Number(char)
        ));
    }
    return parsed;
}

export function unparse(code) {
    return code.map((symbolCode) =>
        symbolCode.map((str) =>
            str >= 0
            ? str
            : typeof str === "number"
            ? String.fromCharCode(-str + 64)
            : "-"
        ).join("")
    ).join("_");
}
