"use strict";
import {newMachine} from "./runner.js";

export function enumerate(maxStates, maxSymbols, maxSteps) {
    function* nextTransition(code, instructions, recState, recSymbol) {
        // Run the machine until an undefined transition
        const machine = newMachine(code, maxSteps);
        const steps = machine.run();

        const state = machine.getData().state;
        const symbol = machine.readCell();

        // Check if the machine is nonhalting
        if (steps < 0) {
            yield code;
            return;
        }

        const instruction = code?.[state]?.[symbol];
        if (!instruction || instruction.length < 3) {
            // Check if the code is full
            instructions++;
            if (instructions >= maxStates * maxSymbols) {
                yield code;
                return;
            }

            // Enumerate every possible canditates
            const maxNextState = Math.min(maxStates - 1, recState + 1);
            const maxWrite = Math.min(maxSymbols - 1, recSymbol + 1);

            for (let nextState = 0; nextState <= maxNextState; nextState++) {
                for (let move = -1; move <= 1; move += 2) {
                    for (let write = 0; write <= maxWrite; write++) {
                        code[state][symbol] = [write, move, nextState];                        
                        yield* nextTransition(
                            code,
                            instructions,
                            Math.max(recState, nextState),
                            Math.max(recSymbol, write)
                        );
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

    return nextTransition(emptyCode(), 1, 1, 1);
}
