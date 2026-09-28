"use strict";
export function newProgram(code, maxSteps) {
    const symbols = code[0] + 1;
    const ruleSpan = Math.round(Math.log(code.length) / Math.log(symbols));

    let tape = [1];
    let steps = 0;
    let status = "running";
    let currRule;
    let offset = 0;

    function readCell(pos) {
        return tape[pos] ?? 0;
    }

    function removeTrailing(tp) {
        const left = tp.findIndex((sym) => sym !== 0);
        const right = tp.findLastIndex((sym) => sym !== 0);
        offset += left;
        tp.splice(0, left);
        tp.splice(right + 1);
        return tp;
    }

    function step() {
        if (status !== "running") return;

        // Increment steps count
        steps++;
        if (steps > maxSteps) return status = "timed out";

        const nextTape = [];
        for (let i = 0; i < tape.length + ruleSpan - 1; i++) {
            let idx = 0;
            for (let j = 0; j < ruleSpan; j++) {
                const cell = readCell(i - j);
                idx += symbols**j * cell;
            }

            const newSymbol = idx === 0 ? 0 : code[idx];
            if (newSymbol === null) {
                currRule = idx;
                return status = "halted";
            }
            nextTape[i] = newSymbol;
        }

        tape = removeTrailing(nextTape);
        return;
    }

    return {
        step,
        readCell,
        get tape() {return tape;},
        get status() {return status;},
        get steps() {return steps;},
        get readCell() {return readCell();},
        get currRule() {return currRule;},
        get offset() {return offset;}
    };
}

export function decide(code, maxSteps) {
    const prog = newProgram(code, maxSteps);
    while (prog.status === "running") prog.step();

    function isPaused() {
        return code.filter((sym) => sym === null).length > 2
        ? "undecided" : "halted";
    }

    return prog.status === "halted"
    ? [isPaused(), prog.steps]
    : ["undecided"];
}
