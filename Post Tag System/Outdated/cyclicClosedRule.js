"use strict";
export function decide(code) {
    function isClosed(rule, visited) {
        function checkMod(modulo) {
            for (let i = modulo; i < rule.length; i += 2) {
                const symbol = rule[i];
                if (symbol === null) continue;
                if (visited.has(symbol)) return true;

                visited.add(symbol);
                const result = isClosed(code[symbol], visited);
                visited.delete(symbol);

                if (result) return true;
            }
            return false;
        }

        return rule !== null && checkMod(0) && checkMod(1);
    }

    const status = code.some((rule, symbol) =>
        isClosed(rule, new Set([symbol]))
    );

    return [status ? "nonhalting" : "undecided"];
}
