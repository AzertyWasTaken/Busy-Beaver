"use strict";
import {newMachine} from "./runner.js";

export function enumerate(maxStates, maxSymbols, maxSteps) {
    function* nextTransition(code, instructions) {
        const machine = newMachine(code, maxSteps);
        const steps = machine.run();
        const {state, symbol} = machine.getData();

        if (steps < 0) {
            yield code;
            return;
        }

        const instruction = code?.[state]?.[symbol];
        if (!instruction || instruction.length < 3) {
            instructions++;
            if (instructions >= maxStates * maxSymbols) {
                yield code;
                return;
            }

            for (let nextState = 0; nextState < maxStates; nextState++) {
                for (let move = -1; move <= 1; move += 2) {
                    for (let write = 0; write < maxSymbols; write++) {
                        code[state][symbol] = [write, move, nextState];                        
                        yield* nextTransition(code, instructions);
                        code[state][symbol] = [];
                    }
                }
            }
        }
    }

    function emptyCode() {
        const code = [];
        for (let a = 0; a < maxStates; a++) {
            code.push([]);
            for (let b = 0; b < maxSymbols; b++) {
                code.at(-1).push([]);
            }
        }

        code[0][0] = [1, 1, 1];
        return code;
    }

    return nextTransition(emptyCode(), 1);
}
