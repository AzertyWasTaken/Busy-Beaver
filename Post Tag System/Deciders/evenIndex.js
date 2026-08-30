"use strict";
export function decEvenIndex(code) {
    const symbols = new Set([0]);

    function checkRule(rule) {
        if (rule.length % 2 !== 0) return false;

        for (let i = 0; i < rule.length; i += 2) {
            const sym = rule[i];
            if (!symbols.has(sym)) {
                symbols.add(sym);
                if (!checkRule(code[sym])) return false;
                symbols.delete(sym);
            }
        }
        return true;
    }

    return checkRule(code[0]);
}
