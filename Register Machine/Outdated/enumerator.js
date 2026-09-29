"use strict";
function toState(state) {
    return state === -1 ? null: state;
}

export function enumerate(maxSize) {
    const code = [[0, 0, 1]];

    function* nextTransition(currSize, hasHalt, recCounter, recState) {
        // Base case: code is full.
        if (currSize >= maxSize) {
            if (hasHalt) yield [code];
            return;
        }

        const maxState = Math.min(recState + 1, maxSize - 1);
        const minState = hasHalt ? 0 : -1;

        // Enumerate every possible increments.
        for (let counter = 0; counter <= recCounter + 1; counter++) {
            for (let nextState = minState; nextState <= maxState; nextState++) {
                code.push([0, counter, toState(nextState)]);
                yield* nextTransition(
                    currSize + 1,
                    hasHalt || nextState === -1,
                    Math.max(recCounter, counter),
                    Math.max(recState, nextState)
                );
                code.pop();
            }
        }

        // Enumerate every possible decrements.
        for (let counter = 0; counter <= recCounter + 1; counter++) {
            for (let nextStateA = minState; nextStateA <= maxState; nextStateA++) {
                const minStateB = (hasHalt || nextStateA === -1) ? 0 : -1;
                const maxStateB = Math.min(Math.max(recState, nextStateA) + 1, maxSize - 1);

                for (let nextStateB = minStateB; nextStateB <= maxStateB; nextStateB++) {
                    code.push([1, counter, toState(nextStateA), toState(nextStateB)]);
                    yield* nextTransition(
                        currSize + 1,
                        hasHalt || nextStateA === -1 || nextStateB === -1,
                        Math.max(recCounter, counter),
                        Math.max(recState, nextStateA, nextStateB)
                    );
                    code.pop();
                }
            }
        }
    }

    return nextTransition(1, false, 0, 1);
}
