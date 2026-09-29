"use strict";
function parseState(instruction) {
    if (instruction === "?") return null;

    const symbol = (i) => parseInt(i);
    const instr = (i) => ({"+": 0, "-": 1}[i] ?? 0);
    const state = (i) => i === "*" ? null : i.charCodeAt(0) - 65;

    const parsed = [];
    parsed.push(instr(instruction[0]));
    parsed.push(symbol(instruction[1]));
    parsed.push(state(instruction[2]));
    if (instruction.length > 3) parsed.push(state(instruction[3]));
    return parsed;
}

export function parse(code) {
    code = code.replace(/\s/g, "");
    const parsed = [];
    const instructions = code.split("_");

    for (let i = 0; i < instructions.length; i++) {
        parsed.push(parseState(instructions[i]))
    }
    return parsed;
}

export function unparse(code) {
    const symbol = (i) => i.toString();
    const instr = (i) => i === 0 ? "+" : "-" ;
    const state = (i) => i === null ? "*" : String.fromCharCode(i + 65);

    return code.map((i) =>
        i === null ? "?" : (
            instr(i[0])
            + symbol(i[1])
            + state(i[2])
            + (i.length > 3 ? state(i[3]) : "")
        )
    ).join("_");
}
