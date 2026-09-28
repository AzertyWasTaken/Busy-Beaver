"use strict";
const FLIP = 0;
const MOVE_RIGHT = 1;
const MOVE_LEFT = 2;
const LOOP_OPEN = 3;
const LOOP_CLOSE = 4;

export function enumerate(maxSize) {
    const code = [FLIP];
    const stack = [];

    function* nextInstruction(currSize, hasMove) {
        // Check if the code is full
        if (currSize >= maxSize && stack.length === 0) {
            yield [code];
            return;
        }

        // Enumerate every possible decrements
        const prevInstr = code.at(-1);
        for (let instr = 0; instr < 5; instr++) {
            if (instr === LOOP_CLOSE) {
                // Mismatched brackets
                if (stack.length <= 0) continue;

                // Empty brackets
                if (prevInstr === LOOP_OPEN) continue;

                // Stacking loops
                if (
                    prevInstr === LOOP_CLOSE
                    && code[stack.at(-1) + 1] === LOOP_OPEN
                ) continue;
            }

            // Program length limit
            if (instr !== LOOP_CLOSE && currSize >= maxSize) continue;

            // Self-cancelling toggles
            if (instr === FLIP && prevInstr === FLIP) continue;

            // Self-cancelling moves
            if (
                instr === MOVE_LEFT && prevInstr === MOVE_RIGHT
                || instr === MOVE_RIGHT && prevInstr === MOVE_LEFT
            ) continue;

            // Symmetry
            if (!hasMove && instr === MOVE_LEFT) continue;

            if (instr === LOOP_OPEN) {
                // Prevent empty brackets
                if (currSize >= maxSize - 1) continue;
            }

            const match = stack.at(-1);
            const instrSize = instr === LOOP_CLOSE ? 0 : 1;
            const nextHasMove = hasMove || instr === MOVE_RIGHT;

            if (instr === LOOP_OPEN) stack.push(code.length);
            if (instr === LOOP_CLOSE) stack.pop();

            code.push(instr);
            yield* nextInstruction(currSize + instrSize, nextHasMove);
            code.pop();

            if (instr === LOOP_CLOSE) stack.push(match);
            if (instr === LOOP_OPEN) stack.pop();
        }
    }

    return nextInstruction(1, false);
}
