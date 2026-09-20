"use strict";
export function decide(code) {
    const symbols = code[0] + 1;
    const ruleSpan = Math.round(Math.log(code.length) / Math.log(symbols));

    function isClosed(len) {
        const array = [1];
        for (let i = len + 1; i < ruleSpan; i += len) {
            array.push(0);
        }

        while (true) {
            for (let offset = 1; offset < len; offset++) {
                let idx = 0;
                for (let i = 0; i < array.length; i++) {
                    const currIdx = i * len + offset;
                    idx += symbols**currIdx * array[i];
                }

                if (idx < code.length && code[idx] !== 0) return false;
            }

            const posIdx = array.findIndex((sym, idx) => {
                if (sym === symbols - 1) {
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

    for (let i = 2; i < ruleSpan; i++) {
        if (isClosed(i)) return ["equivalent"];
    }

    return ["undecided"];
}
