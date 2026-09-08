"use strict"; // 0111_0 => 01110 & 00
const MAX_LEVEL = 10;

function isImmortal(rule, symbol, code) {
    let currRules = [rule];

    for (let i = 0; i < MAX_LEVEL; i++) {
        let nextRules = [];

        for (let j = 0; j < currRules.length; j++) {
            const selectedRule = currRules[j];

            function checkPart(modulo) {
                const res = [];
                let c = false;

                for (let k = modulo; k < selectedRule.length; k += 2) {
                    const sym = selectedRule[k];
                    if (typeof sym !== "number") continue;
                    if (sym === symbol) c = true;

                    res.push(...code[sym]);
                }

                if (!c) nextRules.push(res);
            }

            checkPart(0);
            checkPart(1);
        }

        if (nextRules.length === 0) return true;
        currRules = nextRules;
    }

    return false;
}

export function decImmortalSubstring(code) {
    return code.some((rule, symbol) =>
        isImmortal(rule, symbol, code)
    );
}
