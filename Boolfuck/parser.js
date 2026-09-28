"use strict";
export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const conversion = {"*": 0, ">": 1, "<": 2, "[": 3, "]": 4};

    for (let i = 0; i < code.length; i++) {
        parsed.push(conversion[code[i]]);
    }
    return parsed;
}

export function unparse(code) {
    return code.map((instr) =>
        ["*", ">", "<", "[", "]"][instr]
    ).join("");
}
