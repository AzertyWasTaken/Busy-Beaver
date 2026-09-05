"use strict";
export function decClosedRule(code) {
    return code.some((rule, ruleIdx) => {
        function checkPart(modulo) {
            for (let i = modulo; i < rule.length; i += 2) {
                const symbol = rule[i];
                if (typeof symbol !== "number") continue;
                if (symbol === ruleIdx) return true;
            }
            return false;
        }

        return checkPart(0) && checkPart(1);
    });
}
