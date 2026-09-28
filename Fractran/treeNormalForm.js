"use strict";
import {newProgram} from "./runner.js";

// Check if rule b can be reached if rule a is placed before it.
function override(a, b) {
    const maxLength = Math.max(a.length, b.length);
    for (let i = 0; i < maxLength; i++) {
        const [up, down] = [a[i] ?? 0, b[i] ?? 0];
        if (up < 0 && (up < down || down >= 0)) return false;
    }
    return true;
}

export function enumerate(maxSize, maxSteps) {
    const code = [];

    function hasOverride(rowIdx) {
        for (let i = 0; i < rowIdx; i++) {
            if (override(code[i], code[rowIdx])) return true;
        }
        return false;
    }

    function isRowValid(rowIdx) {
        const row = code[rowIdx];
        return row.length > 0
        && row.at(-1) !== 0
        && row.some((v) => v !== null && v < 0)
        && !hasOverride(rowIdx);
    }

    function isEquivalent(colIdx) {
        if (colIdx < 2) return false;

        for (let rIdx = 0; rIdx < code.length - 1; rIdx++) {
            const rightVal = (code[rIdx][colIdx] ?? 0);
            const leftVal = (code[rIdx][colIdx - 1] ?? 0);

            if (leftVal !== rightVal) return false;
        }

        return true;
    }

    function* enumRow(currSize, recColumn) {
        // Start a new row
        if (isRowValid(code.length - 1))
            yield* nextRow(currSize, recColumn);

        const row = code.at(-1);
        const isEquiv = isEquivalent(row.length);
        const maxValue = maxSize - currSize;
        const minValue = isEquiv ? row.at(-1) : -Infinity;

        for (let value = Math.max(minValue, -maxValue); value <= 0; value++) {
            // Skip zero if the column is not used yet.
            if (value === 0 && row.length >= recColumn) continue;

            row.push(value);
            yield* enumRow(
                currSize + Math.abs(value),
                Math.max(recColumn, row.length)
            );
            row.pop();
        }

        if (Math.max(minValue, 1) > maxValue) return;

        row.push(null);
        yield* enumRow(
            currSize + 1,
            Math.max(recColumn, row.length)
        );
        row.pop();
    }

    function* revealValue(currSize, recColumn, cIdx) {
        const row = code.find((row) => row[cIdx] === null);
        if (!row) {
            yield* nextRow(currSize, recColumn);
            return;
        }

        const isEquiv = isEquivalent(cIdx);
        const maxValue = maxSize - (currSize - 1);
        const minValue = isEquiv ? row[cIdx - 1] : -Infinity;

        for (let value = Math.max(minValue, 1); value <= maxValue; value++) {
            row[cIdx] = value;
            yield* revealValue(currSize - 1 + value, recColumn, cIdx);
            row[cIdx] = null;
        }
    }

    function* nextRow(currSize, recColumn) {
        // Test if this program terminates or times out
        const prog = newProgram(code, maxSteps);
        while (prog.status === "running") prog.step();

        if (prog.status === "timed out") {
            yield [code];
            return;
        }

        if (prog.status === "halted") {
            // Check if the code is full
            if (currSize >= maxSize) {
                if (!code.some((r) => r.some((v) => v === null)))
                    yield [code, prog.steps];
                return;
            }

            code.push([]);
            yield* enumRow(currSize, recColumn);
            code.pop();
            return;
        }

        const cIdx = prog.currCounter;
        yield* revealValue(currSize, recColumn, cIdx);
    }

    return nextRow(0, 1);
}
