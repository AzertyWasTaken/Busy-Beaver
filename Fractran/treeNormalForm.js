"use strict";
import {newMachine} from "./runner.js";

// Check if a is at least "easier" to reach than b
function isSuperset(a, b) {
    const maxLength = Math.max(a.length, b.length);
    for (let i = 0; i < maxLength; i++) {
        if ((b[i] ?? 0) <= 0 && (a[i] ?? 0) < (b[i] ?? 0)) return false;
    }
    return true;
}

export function enumerateTNF(maxSize, maxSteps) {
    function* nextRule(currSize, code, rowCode, recColumn) {
        function isRowCodeValid() {
            return rowCode.length > 0
            && rowCode.at(-1) !== 0
            && rowCode.some((e) => e < 0)
            && code.every((e) => !isSuperset(e, rowCode));
        }

        // Check if the code is full
        if (currSize >= maxSize) {
            if (isRowCodeValid()) {
                code.push(rowCode);
                yield code;
                code.pop();
            }
            return;
        }

        // Extend the current row
        for (let value = 1; value <= maxSize - currSize; value++) {
            // Positive
            rowCode.push(value);
            yield* nextRule(
                currSize + value,
                code,
                rowCode,
                Math.max(recColumn, rowCode.length)
            );
            rowCode.pop();

            // Negative
            rowCode.push(-value);
            yield* nextRule(
                currSize + value,
                code,
                rowCode,
                Math.max(recColumn, rowCode.length)
            );
            rowCode.pop();
        }

        if (rowCode.length < recColumn) {
            rowCode.push(0);
            yield* nextRule(currSize, code, rowCode, recColumn);
            rowCode.pop();
        }

        // Start a new row
        if (isRowCodeValid()) {
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
    }

    return nextRule(0, [], [], 1);
}
