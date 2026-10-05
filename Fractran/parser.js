"use strict";
const DEC_INSTR = "dec";
const INC_INSTR = "inc";

export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const rows = code.split("_");

    for (let i = 0; i < rows.length; i++) {
        parsed.push(Array.from(rows[i], (char) =>
            char === "+" ? INC_INSTR
            : char === "-" ? DEC_INSTR
            : /[a-zA-Z]/.test(char) ? -(char.charCodeAt(0) - 64)
            : Number(char)
        ));
    }
    return parsed;
}

export function unparse(code) {
    return code.map((row) =>
        row.map((str) =>
            str === INC_INSTR ? "+"
            : str === DEC_INSTR ? "-"
            : str >= 0 ? str
            : String.fromCharCode(-str + 64)
        ).join("")
    ).join("_");
}
