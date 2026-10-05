"use strict";
function isRowValid(row) {
    return row.at(-1) !== 0
    && row.some((v) => v < 0);
}

export function enumerate(maxSize) {
    const code = [[]];

    function* nextValue(currSize, recColumn) {
        const row = code.at(-1);

        // Yield the code or start a new row
        if (isRowValid(row)) {
            if (currSize >= maxSize) {
                yield [code];
            } else {
                code.push([]);
                yield* nextValue(currSize, recColumn);
                code.pop();
            }
        }

        if (currSize >= maxSize) return;

        // Extend the current row
        const remainSize = maxSize - currSize;
        const nextRecCol = Math.max(recColumn, row.length);

        for (let value = -remainSize; value <= remainSize; value++) {
            if (value === 0 && recColumn < row.length) continue;

            row.push(value);
            yield* nextValue(currSize + Math.abs(value), nextRecCol);
            row.pop();
        }
    }

    return nextValue(0, 0);
}
