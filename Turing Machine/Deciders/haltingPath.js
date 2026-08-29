"use strict";
function canGetStuck(stateCode, state, code) {
    for (const instruction of stateCode) {
        if (!instruction || instruction.length < 3) return false;

        const nextState = instruction[2];
        if (!state.has(nextState)) {
            state.add(nextState);
            if (!canGetStuck(code[nextState], state, code)) return false;
            state.delete(nextState);
        }
    }
    return true;
}

export function decHaltingPath(code) {
    return code.some((stateCode, state) =>
        canGetStuck(stateCode, new Set([state]), code)
    );
}
