"use strict";
export function* enumerate(
    maxStates,
    maxSymbols,
    currState = 0,
    currSymbol = 1,
    ruleset = [],
    stateRules = [[1, 1, 1]],
    hasHalt = false
) {
    if (currState >= maxStates) {
        if (hasHalt) yield ruleset;
        return;
    }

    if (currSymbol >= maxSymbols) {
        yield* enumerate(
            maxStates,
            maxSymbols,
            currState + 1,
            0,
            [...ruleset, stateRules],
            [],
            hasHalt
        );
        return;
    }
    
    for (let nextState = 0; nextState < maxStates; nextState++) {
        for (let move = -1; move <= 1; move += 2) {
            for (let write = 0; write < maxSymbols; write++) {
                yield* enumerate(
                    maxStates,
                    maxSymbols,
                    currState,
                    currSymbol + 1,
                    ruleset,
                    [...stateRules, [write, move, nextState]],
                    hasHalt
                );
            }
        }
    }

    if (!hasHalt) {
        yield* enumerate(
            maxStates,
            maxSymbols,
            currState,
            currSymbol + 1,
            ruleset,
            [...stateRules, []],
            true
        );
    }
}
