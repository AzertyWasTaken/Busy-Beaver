"use strict";
export function decide(code) {
    function checkRule(symbol, visited) {
        if (symbol === null) return false;

        const rule = code[symbol];
        if (rule === null || rule.length % 2 !== 0) return false;

        for (let i = 0; i < rule.length; i += 2) {
            const sym = rule[i];
            if (sym === null) return false;

            if (!visited.has(sym)) {
                visited.add(sym);
                const result = checkRule(sym, visited);
                visited.delete(sym);

                if (result === false) return false;
            }
        }
        return true;
    }

    const status = checkRule(0, new Set([0]));
    return {status: status ? "equivalent" : "undecided"};
}
