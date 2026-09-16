"use strict";
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

function isImmortal(rule, code) {
    let prevRules = [rule];
    let currRules = [rule];

    while (true) {
        let nextRules = [];

        for (let i = 0; i < currRules.length; i++) {
            const visitedRule = currRules[i];

            function checkPart(modulo) {
                let res = [];

                function hasSubstring() {
                    return prevRules.some((r) => hasSequence(r, res));
                }

                for (let k = modulo; k < visitedRule.length; k += 2) {
                    const sym = visitedRule[k];
                    if (sym === null || code[sym] === null) {
                        if (!hasSubstring()) nextRules.push(res);
                        if (res.length < 2) return false;
                        res = [];
                        continue;
                    }
                    res.push(...code[sym]);
                }

                if (!hasSubstring()) nextRules.push(res);
                if (res.length < 2) return false;
                return true;
            }

            if (!checkPart(0) || !checkPart(1)) return false;
        }

        if (nextRules.length === 0) return true;
        prevRules.push(...currRules);
        currRules = nextRules;
    }
}

export function decide(code) {
    const status = code.some((rule) =>
        isImmortal(rule, code)
    );
    return {status: status ? "nonhalting" : "undecided"};
}
