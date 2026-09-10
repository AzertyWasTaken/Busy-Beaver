"use strict";
const MAX_LEVEL = 10;

// Check if a appears as an exact consecutive sequence inside b
function hasSequence(a, b) {
    for (let i = 0; i <= b.length - a.length; i++) {
        let match = true;

        for (let j = 0; j < a.length; j++) {
            if (a[j] !== b[i + j]) {
                match = false;
                break;
            }
        }

        if (match) return true;
    }

    return false;
}

function isImmortal(rule, symbol, code) {
    let prevRules = [[symbol, symbol]];
    let currRules = [rule];

    for (let i = 0; i < MAX_LEVEL; i++) {
        let nextRules = [];

        for (let j = 0; j < currRules.length; j++) {
            const selectedRule = currRules[j];

            function checkPart(modulo) {
                let res = [];
                function hasSubstring() {
                    return prevRules.every((r) => !hasSequence(r, res));
                }

                for (let k = modulo; k < selectedRule.length; k += 2) {
                    const sym = selectedRule[k];
                    if (typeof sym !== "number") {
                        if (hasSubstring()) nextRules.push(res);
                        if (res.length < 2) return false;
                        res = [];
                        continue;
                    }
                    res.push(...code[sym]);
                }

                if (hasSubstring()) nextRules.push(res);
                return res.length >= 2;
            }

            if (!checkPart(0) || !checkPart(1)) return false;
        }

        if (nextRules.length === 0) return true;
        prevRules.push(...currRules);
        currRules = nextRules;
    }

    return false;
}

export function decImmortalSubstring(code) {
    return code.some((rule, symbol) =>
        isImmortal(rule, symbol, code)
    );
}
