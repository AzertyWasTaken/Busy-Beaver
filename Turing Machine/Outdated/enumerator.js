"use strict";
export function enumerate(maxStates, maxSymbols) {
    function* nextTransition(currState, currSymbol, code, stateCode, hasHalt) {
        // Check if the code is full
        if (currState >= maxStates) {
            if (hasHalt) yield code;
            return;
        }

        // Check if the state code is full
        if (currSymbol >= maxSymbols) {
            code.push(stateCode);
            yield* nextTransition(currState + 1, 0, code, [], hasHalt);
            code.pop();
            return;
        }

        // Enumerate every possible canditates
        for (let nextState = 0; nextState < maxStates; nextState++) {
            for (let move = -1; move <= 1; move += 2) {
                for (let write = 0; write < maxSymbols; write++) {
                    stateCode.push([write, move, nextState]);
                    yield* nextTransition(currState, currSymbol + 1, code, stateCode, hasHalt);
                    stateCode.pop();
                }
            }
        }

        // Check if an halting transition can be added
        if (!hasHalt) {
            stateCode.push([]);
            yield* nextTransition(currState, currSymbol + 1, code, stateCode, true);
            stateCode.pop();
        }
    }

    return nextTransition(0, 1, [], [[1, 1, 1]], false);
}
