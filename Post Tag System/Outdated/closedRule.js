"use strict";
export function decide(code) {
    const status = code.some((rule, symbol) => {
        function checkMod(modulo) {
            for (let i = modulo; i < rule.length; i += 2) {
                if (rule[i] === symbol) return true;
            }
            return false;
        }

        return rule !== null && checkMod(0) && checkMod(1);
    });

    return [status ? "nonhalting" : "undecided"];
}
