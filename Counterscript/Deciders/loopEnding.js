"use strict";
function cannotHalt(code, counter, start, end) {    
    for (let index = end - 1; index > start; index--) {
        const instr = code[index];
        if (instr === null) return false;
        if (instr[0] === 0 && instr[1] === counter) return true;
        if (instr[0] === 1 && instr[1] === counter) return false;
        if (instr[0] === 3) {
            if (cannotHalt(code, counter, instr[2], index)) {
                index = instr[2];
            }
            else return false;
        }
    }
    return true;
}

export function decLoopEnding(code) {
    for (let index = 0; index < code.length; index++) {
        const instr = code[index];
        if (instr === null) continue;

        if (
            instr[0] === 2
            && cannotHalt(code, instr[1], index, instr[2])
        ) return true;
    }
    return false;
}
