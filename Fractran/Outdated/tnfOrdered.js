"use strict";
import {newProgram} from "../runner.js";

const DEC_INSTR = "dec";
const INC_INSTR = "inc";

function isUnknown(value) {
    return value === INC_INSTR || value === DEC_INSTR;
}

function isIncrement(value) {
    return value === INC_INSTR
    || value !== DEC_INSTR && value > 0;
}

function isDecrement(value) {
    return value === DEC_INSTR
    || value !== INC_INSTR && value < 0;
}

function isRowValid(row) {
    return row.at(-1) !== 0
    && row.some((v) => isDecrement(v));
}

function getMinValue(value) {
    return value === INC_INSTR ? 1
    : value === DEC_INSTR ? -Infinity
    : value;
}

function getMaxValue(value) {
    return value === INC_INSTR ? Infinity
    : value === DEC_INSTR ? -1
    : value;
}

export function enumerate(maxSize, maxSteps) {
    const code = [[]];

    function isEquivalent(rowIdx, colIdx) {
        if (colIdx < 2) return false;

        for (let r = 0; r < rowIdx; r++) {
            const rightVal = code[r][colIdx] ?? 0;
            if (isUnknown(rightVal)) return false;

            const leftVal = code[r][colIdx - 1] ?? 0;
            if (leftVal !== rightVal) return false;
        }

        return true;
    }

    function getShift(rowIdx) {
        if (rowIdx === 0) return [0, 0];

        const incs = code.filter((row) => isIncrement(row[rowIdx] ?? 0)).length;
        const decs = code.filter((row) => isDecrement(row[rowIdx] ?? 0)).length;

        return [
            decs > 0 && incs === 0 ? 1 : 0,
            incs > 0 && decs === 0 ? 1 : 0
        ];
    }

    function* nextValue(currSize, recColumn) {
        if (currSize > maxSize) return;
        const row = code.at(-1);

        // Yield the code or start a new row
        if (isRowValid(row)) yield* nextRow(currSize, recColumn);

        const nextRecCol = Math.max(recColumn, row.length);
        if (recColumn < row.length) currSize++;
        const [shiftInc, shiftDec] = getShift(row.length);

        // ---- Decrement ----
        row.push(DEC_INSTR);
        yield* nextValue(currSize + 1 - shiftDec, nextRecCol);
        row.pop();

        // ---- Zero ----
        if (recColumn >= row.length) {
            row.push(0);
            yield* nextValue(currSize, nextRecCol);
            row.pop();
        }

        // ---- Increment ----
        row.push(INC_INSTR);
        yield* nextValue(currSize + 1 - shiftInc, nextRecCol);
        row.pop();
    }

    function* enumValue(currSize, recColumn, colIdx) {
        const rowIdx = code.findIndex((row) => isUnknown(row[colIdx]));

        // No unknowns left at this column: the program is complete.
        if (rowIdx < 0) {
            yield* nextRow(currSize, recColumn);
            return;
        }

        const row = code[rowIdx];
        const cell = row[colIdx];
        const maxValue = maxSize - (currSize - 1);

        const isEquivMin = isEquivalent(rowIdx, colIdx);
        const equivMin = isEquivMin ? getMinValue(row[colIdx - 1]) : -Infinity;

        const isEquivMax = isEquivalent(rowIdx, colIdx);
        const equivMax = isEquivMax ? getMaxValue(row[colIdx + 1]) : Infinity;

        if (cell === DEC_INSTR) {
            const minVal = Math.max(-maxValue, equivMin);
            const maxVal = Math.min(-1, equivMax);

            for (let value = minVal; value <= maxVal; value++) {
                row[colIdx] = value;
                yield* enumValue(currSize - 1 - value, recColumn, colIdx);
            }

            row[colIdx] = cell;
        }

        else if (cell === INC_INSTR) {
            const minVal = Math.max(1, equivMin);
            const maxVal = Math.min(maxValue, equivMax);

            for (let value = minVal; value <= maxVal; value++) {
                row[colIdx] = value;
                yield* enumValue(currSize - 1 + value, recColumn, colIdx);
            }

            row[colIdx] = cell;
        }
    }

    function* nextRow(currSize, recColumn) {
        // Run the program until it halts, times out, or pauses on an unknown value
        const prog = newProgram(code, maxSteps);
        while (prog.status === "running") prog.step();

        if (prog.status === "timed out") {
            yield [code];
            return;
        }

        if (prog.status === "paused") {
            // The program paused on an unknown value
            yield* enumValue(currSize, recColumn, prog.currCounter);
            return;
        }

        yield [code, prog.steps];

        // Check if the code is full
        if (currSize >= maxSize) return;

        // The code is not full, so a longer program can still halt
        code.push([]);
        yield* nextValue(currSize, recColumn);
        code.pop();
    }

    return nextValue(0, 0);
}
