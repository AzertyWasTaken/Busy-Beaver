"use strict";
export function enumerate(maxSize) {
    function* nextInstruction(currSize, code, stack) {
        // Check if the code is full
        if (currSize >= maxSize && stack === 0) {
            yield code;
            return;
        }

        // Enumerate every possible decrements
        for (let counter = 0; counter < 6; counter++) {
            if (counter === 5) {
                // Mismatched brackets
                if (stack === 0) continue;

                // Empty brackets
                if (code.at(-1) === 4) continue;

                // Nonhalting brackets
                if (code.at(-1) === 0) continue;
            }

            // Program length limit
            if (counter !== 5 && currSize >= maxSize) continue;

            // Self-cancelling bits
            if (
                (counter === 0 || counter === 1)
                && (code.at(-1) === 0 || code.at(-1) === 1)
            ) continue;

            // Unused bit
            if (counter === 0 && code.at(-1) === 4) continue;

            // Self-cancelling moves
            if (
                counter === 3 && code.at(-1) === 2
                || counter === 2 && code.at(-1) === 3
            ) continue;

            if (counter === 4) {
                // Never used brackets
                if (code.at(-1) === 1) continue;

                // Prevent empty brackets
                if (currSize >= maxSize - 1) continue;
            }

            code.push(counter);
            yield* nextInstruction(
                currSize + (counter === 5 ? 0 : 1),
                code,
                stack + (counter === 4 ? 1 : counter === 5 ? -1 : 0)
            );
            code.pop();
        }
    }

    return nextInstruction(1, [0], 0);
}
