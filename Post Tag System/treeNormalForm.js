"use strict";
import {newTag} from "./runner.js";

export function enumerateTNF(maxSize, maxSteps) {
    function* nextRule(code, size, recSymbol, symbol) {
        for (let len = 0; len <= maxSize - size; len++) {
            size += len;

            code[symbol] = [];
            for (let i = 0; i < len; i++) code[symbol].push([symbol, i]);
            yield* nextStep(code, size, recSymbol);
            delete code[symbol];
            while (code.length > 0 && code.at(-1) === undefined) code.pop();

            size -= len;
        }
    }

    function* revealSymbol(code, size, recSymbol, [sym, idx]) {
        // Enumerate every possible canditates
        for (let symbol = 0; symbol <= recSymbol + 1; symbol++) {
            const symTuple = code[sym][idx];
            code[sym][idx] = symbol;
            yield* nextStep(code, size, Math.max(symbol, recSymbol));
            code[sym][idx] = symTuple;
        }
    }

    function* nextStep(code, size, recSymbol) {
        // Run the tag system until an undefined production rule
        const tag = newTag(code, maxSteps);
        const steps = tag.run();

        const {string, head, status} = tag.getData();
        if (string.length - head < 2) {
            yield code;
            return;
        }

        // Check if the tag system timed out
        if (status === "timed out") {
            if (size === maxSize) yield code;
            return;
        }    

        const symbol = string[head];

        if (typeof symbol !== "number") {
            yield* revealSymbol(code, size, recSymbol, symbol);
            return;
        }

        const rule = code[symbol];
        if (!rule) {
            yield* nextRule(code, size, recSymbol, symbol);
        }
    }

    return nextStep([], 0, 0);
}
