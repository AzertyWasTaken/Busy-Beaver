"use strict";
export function enumerate(maxSize) {
    function* nextTransition(currSize, code, maxCounter) {
        // Check if the code is full
        if (currSize >= maxSize) {
            yield code;
            return;
        }

         // Enumerate every possible increments
        for (let counter = 0; counter <= maxCounter + 1; counter++) {
            code.push([0, counter]);
            yield* nextTransition(currSize + 1, code, Math.max(maxCounter, counter));
            code.pop();
        }

        // Enumerate every possible decrements
        for (let nextState = 0; nextState < maxSize; nextState++) {
            for (let counter = 0; counter <= maxCounter + 1; counter++) {
                code.push([1, counter, nextState]);
                yield* nextTransition(currSize + 1, code, Math.max(maxCounter, counter));
                code.pop();
            }
        }
    }

    return nextTransition(0, [], -1);
}
