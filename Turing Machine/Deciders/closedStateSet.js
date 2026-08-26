"use strict";
function isStateClosed(stateCode, state, code) {
    for (const instruction of stateCode) {
        if (!instruction || instruction.length < 3) return false;

        const nextState = instruction[2];
        if (!state.has(nextState)) {
            state.add(nextState);
            if (!isStateClosed(code[nextState], state, code)) return false;
            state.delete(nextState);
        }
    }
    return true;
}

export function isClosedStateSet(code) {
    return code.some((stateCode, state) =>
        isStateClosed(stateCode, new Set([state]), code)
    );
}
