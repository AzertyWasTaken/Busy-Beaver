"use strict";
import {newMachine} from "./runner.js";

// (11A, 1AA) => true // (11B, 1AA) => false
function isSuperset(a, b) {
    const maxLength = Math.max(a.length, b.length);
    for (let i = 0; i < maxLength; i++) {
        if ((a[i] ?? 0) < 0 && (b[i] ?? 0) > (a[i] ?? 0)) return false;
    }
    return true;
}

export function enumerateTNF(maxSize, maxSteps) {
    function* nextRule(currSize, code, rowCode, recColumn) {
        function isRowCodeValid() {
            return rowCode.length > 0
            && rowCode.at(-1) !== 0
            && rowCode.some((v) => v < 0)
            && !code.some((r) => isSuperset(r, rowCode));
        }

        // Check if the code is full
        if (currSize >= maxSize) {
            if (!isRowCodeValid()) return;
            code.push(rowCode);
            yield code;
            code.pop();
            return;
        }

        const prevValue = rowCode.at(-1);
        const areValuesEqual =
        rowCode.length > 1
        && code.every((r) =>
            (r[rowCode.length - 1] ?? 0) === (r[rowCode.length] ?? 0)
        );

        // Extend the current row
        const maxValue = maxSize - currSize;
        const minValue = areValuesEqual ? prevValue : -maxValue;
        for (let value = minValue; value <= maxValue; value++) {
            if (value === 0 && rowCode.length >= recColumn) continue;

            rowCode.push(value);
            yield* nextRule(
                currSize + Math.abs(value),
                code,
                rowCode,
                Math.max(recColumn, rowCode.length)
            );
            rowCode.pop();
        }

        // Start a new row
        if (!isRowCodeValid()) return;

        code.push(rowCode);

        // Run the program until an undefined rule
        const machine = newMachine(code, maxSteps);
        const steps = machine.run();

        // Check if the tag system timed out
        if (steps < 0) {
            yield code;
        } else {
            yield* nextRule(currSize, code, [], recColumn);
        }

        code.pop();
    }

    return nextRule(0, [], [], 1);
}
