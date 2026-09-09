"use strict";
export function enumerate(maxSize) {
    function* nextInstruction(currSize, code, stack, recCounter, minCounter, incMode) {
        // Check if the code is full
        if (currSize >= maxSize && stack.length === 0) {
            yield code;
            return;
        }

        // Enumerate every possible instructions
        for (let type = 0; type < 4; type++) {
            if (type === 3 && (stack.length === 0 || code.at(-1)[0] === 2)) continue;
            if (type !== 3 && currSize >= maxSize) continue;
            if (type === 2 && currSize >= maxSize - 1) continue;

            const currMinCounter = ((type === 2 || type === 3) ? 0 : minCounter);
            for (let counter = currMinCounter; counter <= recCounter + 1; counter++) {
                if (incMode === counter && type === 1) continue;
                if (type === 3 && counter !== stack.at(-1)) continue;

                if (type === 2) stack.push(counter);
                if (type === 3) stack.pop();

                code.push([type, counter]);
                yield* nextInstruction(
                    currSize + (type === 3 ? 0 : 1),
                    code,
                    stack,
                    Math.max(recCounter, counter),
                    (type === 2 || type === 3) ? 0 : Math.max(minCounter, counter),
                    type === 0 ? counter : null
                );
                code.pop();

                if (type === 3) stack.push(counter);
                if (type === 2) stack.pop();
            }
        }
    }

    return nextInstruction(1, [[0,0]], [], 0, 0, 0);
}
