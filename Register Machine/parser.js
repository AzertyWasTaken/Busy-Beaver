"use strict";
function parseState(instruction) {
    const symbol = (i) => parseInt(i);
    const instr = (i) => ({"+": 0, "-": 1}[i] ?? 0);
    const state = (i) => i.charCodeAt(0) - 65;

    const parsed = [];
    parsed.push(instr(instruction[1]));
    parsed.push(symbol(instruction[0]));
    if (instruction.length > 2) parsed.push(state(instruction[2]));
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
    const state = (i) => String.fromCharCode(i + 65);

    return code.map((i) =>
        symbol(i[1])
        + instr(i[0])
        + (i.length >= 3 ? state(i[2]) : "")
    ).join("_");
}
