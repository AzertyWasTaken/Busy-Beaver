"use strict";
export function decide(code) {
    const emptyIdx = code.findLastIndex((r) =>
        r !== null && r.length === 0
    );

    const status = code.some((rule) => {
        function checkMod(modulo) {
            for (let i = modulo; i < rule.length; i += 2) {
                if (rule[i] === emptyIdx) return true;
            }
            return false;
        }

        return rule !== null && checkMod(0) && checkMod(1);
    });

    return [status ? "equivalent" : "undecided"];
}
