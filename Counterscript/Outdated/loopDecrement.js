"use strict";
function cannotHalt(code, counter) {
    return !code.some((i) =>
        i === null || i[0] === 1 && i[1] === counter
    );
}

export function decLoopDecrement(code) {
    for (let index = 0; index < code.length; index++) {
        const instr = code[index];
        if (instr === null) continue;

        if (
            instr[0] === 2
            && cannotHalt(code.slice(index + 1, instr[2]), instr[1])
        ) return true;
    }
    return false;
}
