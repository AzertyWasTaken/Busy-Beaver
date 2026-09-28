"use strict";
import {newProgram} from "./runner.js";

export function enumerate(maxSize, maxSteps) {
    const code = [null];

    function hasNullInstr() {
        return code.some((r) => r === null || r.includes(null));
    }

    // Enumerates every allowed symbol
    function* candidates(recSymbol) {
        for (let sym = 0; sym <= recSymbol + 1; sym++) {
            const newSymbol = sym > recSymbol;
            if (newSymbol) code.push(null);
            yield sym;
            if (newSymbol) code.pop();
        }
    }

    function* nextRule(size, recSymbol, symbol, mod) {
        const currLength = code[symbol].length;
        const minLength = symbol === 0 ? 3 : 0;

        if (currLength >= minLength) {
            yield* nextStep(size, recSymbol);
        }

        if (size >= maxSize) return;

        if (currLength % 2 !== mod) {
            code[symbol].push(null);
            yield* nextRule(size + 1, recSymbol, symbol, mod);
            code[symbol].pop();
            return;
        }

        for (const sym of candidates(recSymbol)) {
            code[symbol].push(sym);
            yield* nextRule(size + 1, Math.max(sym, recSymbol), symbol, mod);
            code[symbol].pop();
        }
    }

    function* revealSymbol(size, recSymbol, symbol, idx) {
        const hasSymbol = code[symbol].includes(symbol);

        if (idx >= code[symbol].length) {
            if (size === maxSize || hasNullInstr()) yield* nextStep(size, recSymbol);
            return;
        }

        for (const sym of candidates(recSymbol)) {
            if (hasSymbol && sym === symbol) continue;

            code[symbol][idx] = sym;
            yield* revealSymbol(size, Math.max(sym, recSymbol), symbol, idx + 2);
            code[symbol][idx] = null;
        }
    }

    function* nextStep(size, recSymbol) {
        // Run the tag system until an undefined production rule
        const prog = newProgram(code, maxSteps);
        while (prog.status === "running") prog.step();

        if (prog.status === "halted") {
            if (size === maxSize) yield [code, prog.steps];
            return;
        }

        if (prog.status === "timed out") {
            yield [code];
            return;
        }

        const symbol = prog.symbol;
        const queueLength = prog.queueLength;

        if (code[symbol] === null) {
            code[symbol] = [];
            yield* nextRule(size, recSymbol, symbol, queueLength % 2);
            code[symbol] = null;
            return;
        }

        yield* revealSymbol(size, recSymbol, symbol, queueLength % 2);
        return;
    }

    return nextStep(0, 0);
}
