"use strict";
export function enumerate(maxSize) {
    function* nextRule(currSize, code, rowCode, recColumn) {
        function isRowCodeValid() {
            return rowCode.length > 0
            && rowCode.at(-1) !== 0
            && rowCode.some((e) => e < 0);
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
            yield* nextRule(currSize, code, [], recColumn);
            code.pop();
        }
    }

    return nextRule(0, [], [], 1);
}
