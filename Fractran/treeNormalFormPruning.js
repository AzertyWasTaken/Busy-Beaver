"use strict";
import {newProgram} from "./runner.js";

const DEC_VALUE = "negative";
const INC_VALUE = "positive";

function isUnknown(value) {
    return value === INC_VALUE || value === DEC_VALUE;
}

function isNegative(value) {
    return value === DEC_VALUE
    || value !== INC_VALUE && value < 0;
}

function getMinValue(value) {
    return value === INC_VALUE ? 0
    : value === DEC_VALUE ? -Infinity
    : value;
}

function hasNegative(row) {
    // An instruction with no negative value always applies, so it never halts
    return row.some((v) => isNegative(v));
}

// Check if rule b can be reached if rule a is placed before it.
function override(a, b) {
    const maxLength = Math.max(a.length, b.length);
    for (let i = 0; i < maxLength; i++) {
        const upVal = a[i] ?? 0;
        const downVal = b[i] ?? 0;

        if (upVal === INC_VALUE) continue;
        if (upVal === DEC_VALUE) return false;

        if (upVal >= 0) continue;
        if (downVal === DEC_VALUE || downVal === INC_VALUE) return false;
        if (upVal < downVal || downVal >= 0) return false;
    }
    return true;
}

export function enumerate(maxSize, maxSteps) {
    const code = [];
    const minIncCache = new Map();
    const minDecCache = new Map();

    function getCacheKey(rowIdx, colIdx) {
        return colIdx * maxSize + rowIdx;
    }

    function hasOverride(rowIdx) {
        for (let i = 0; i < rowIdx; i++) {
            if (override(code[i], code[rowIdx])) return true;
        }
        return false;
    }

    function isEquivalent(colIdx) {
        if (colIdx < 2) return false;

        for (let rIdx = 0; rIdx < code.length - 1; rIdx++) {
            const rightVal = code[rIdx][colIdx] ?? 0;
            const leftVal = code[rIdx][colIdx - 1] ?? 0;

            if (leftVal !== rightVal || isUnknown(leftVal)) return false;
        }

        return true;
    }

    function* enumRow(currSize, recColumn) {
        const rowIdx = code.length - 1;
        const row = code[rowIdx];

        if (row.at(-1) === DEC_VALUE) {
            if (hasNegative(row)) yield* nextRow(currSize, recColumn);
        }

        if (currSize >= maxSize) return;

        const nextRecColumn = Math.max(recColumn, row.length + 1);
        const cacheKey = getCacheKey(code.length - 1, row.length);

        const maxValue = maxSize - currSize;
        const isEquiv = isEquivalent(row.length);
        const minValue = isEquiv ? getMinValue(row.at(-1)) : -Infinity;

        // ---- Decrement ----

        const minDec = Math.max(minValue, -maxValue);
        minDecCache.set(cacheKey, minDec);

        if (minDec < 0) {
            row.push(DEC_VALUE);
            yield* enumRow(currSize + 1, nextRecColumn);
            row.pop();
        }

        minDecCache.delete(cacheKey);

        // ---- Ending increment ----

        const minIncEnd = Math.max(minValue, 1);

        if (minIncEnd <= maxValue) {
            minIncCache.set(cacheKey, minIncEnd);

            row.push(INC_VALUE);
            if (hasNegative(row)) yield* nextRow(currSize + minIncEnd, nextRecColumn);
            row.pop();
        }

        // ---- Resuming increment ----

        const minInc = Math.max(minValue, row.length >= recColumn ? 1 : 0);

        if (minInc <= maxValue) {
            minIncCache.set(cacheKey, minInc);

            row.push(INC_VALUE);
            yield* enumRow(currSize + minInc, nextRecColumn);
            row.pop();
        }

        minIncCache.delete(cacheKey);
    }

    function* revealValue(currSize, recColumn, colIdx) {
        const rowIdx = code.findIndex((row) => isUnknown(row[colIdx]));

        // No unknowns left at this column: the program is complete.
        if (rowIdx < 0) {
            yield* nextRow(currSize, recColumn);
            return;
        }

        const row = code[rowIdx];
        const cell = row[colIdx];
        const cacheKey = getCacheKey(rowIdx, colIdx);

        if (cell === DEC_VALUE) {
            const maxValue = maxSize - (currSize - 1);
            const minValue = Math.max(minDecCache.get(cacheKey), -maxValue);

            for (let value = minValue; value < 0; value++) {
                row[colIdx] = value;
                if (!hasOverride(rowIdx)) {
                    yield* revealValue(currSize - 1 - value, recColumn, colIdx);
                }
            }

            row[colIdx] = DEC_VALUE;
            return;
        }

        if (cell === INC_VALUE) {
            const minValue = minIncCache.get(cacheKey);
            const maxValue = maxSize - (currSize - minValue);

            for (let value = minValue; value <= maxValue; value++) {
                row[colIdx] = value;
                if (!hasOverride(rowIdx)) {
                    yield* revealValue(currSize - minValue + value, recColumn, colIdx);
                }
            }

            row[colIdx] = INC_VALUE;
            return;
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
                if (!code.some((r) => r.some((v) => isUnknown(v))))
                    yield [code, prog.steps];
                return;
            }

            // The code is not full, so a longer program can still halt
            code.push([]);
            yield* enumRow(currSize, recColumn);
            code.pop();
            return;
        }

        // The program paused on an unknown value
        yield* revealValue(currSize, recColumn, prog.currCounter);
    }

    return nextRow(0, 1);
}
