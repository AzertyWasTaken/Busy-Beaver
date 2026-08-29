"use strict";
export function decUnusedSymbol(code) {
    const undefinedSymbols = new Set();
    const usedSymbols = new Set();

    for (let sym = 0; sym < code[0].length; sym++) {
        let acc = 0;

        for (let stt = 0; stt < code.length; stt++) {
            const instr = code[stt][sym];

            if (instr.length === 0) {
                acc++;
                undefinedSymbols.add(sym);
            } else {
                usedSymbols.add(instr[2]);
            }
        }

        if (acc > 0 && acc < code.length) return false;
    }

    return usedSymbols.isDisjointFrom(undefinedSymbols);
}
