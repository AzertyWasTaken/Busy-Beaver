"use strict";
export function decide(code) {
    const symbols = code[0] + 1;
    const ruleSpan = Math.round(Math.log(code.length) / Math.log(symbols));

    function isClosed(currSymbols) {
        const array = [1];
        for (let i = 1; i < ruleSpan; i++) {
            array.push(0);
        }

        while (true) {
            let idx = 0;
            for (let i = 0; i < array.length; i++) {
                idx += symbols**i * array[i];
            }

            if (
                code[idx] === null
                || code[idx] > currSymbols - 1
            ) return false;

            const posIdx = array.findIndex((sym, idx) => {
                if (sym === currSymbols - 1) {
                    array[idx] = 0;
                    return false;
                } else {
                    array[idx]++;
                    return true;
                }
            });

            if (posIdx < 0) return true;
        }
    }

    for (let i = 2; i <= symbols; i++) {
        if (isClosed(i)) return ["equivalent"];
    }

    return ["undecided"];
}
