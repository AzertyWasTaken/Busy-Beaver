"use strict";
export function enumerate(maxSize) {
    const code = [[]];

    function* nextRow(currSize, recColumn) {
        const row = code.at(-1);

        function isRowValid() {
            return row.length > 0
            && row.at(-1) !== 0
            && row.some((e) => e < 0);
        }

        // Check if the code is full
        if (currSize >= maxSize) {
            if (isRowValid()) yield [code];
            return;
        }

        // Extend the current row
        const remainSize = maxSize - currSize;
        for (let value = -remainSize; value <= remainSize; value++) {
            if (value === 0 && row.length >= recColumn) continue;

            row.push(value);
            yield* nextRow(
                currSize + Math.abs(value),
                Math.max(recColumn, row.length)
            );
            row.pop();
        }

        // Start a new row
        if (isRowValid()) {
            code.push([]);
            yield* nextRow(currSize, recColumn);
            code.pop();
        }
    }

    return nextRow(0, 1);
}
