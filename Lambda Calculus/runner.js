"use strict";
export function newProgram(code, maxSteps) {
    const expression = [...code];
    let steps = 0;
    let status = "running";

    function nextArgument(index) {
        let level = [-1];
        const shift = [];
        const insert = [];

        for (let i = index; i < expression.length; i++) {
            const char = expression[i];

            if (char === "/") {
                level[level.length - 1]++;
            }
            else if (char === "*") {
                level.push(level.at(-1));
            }
            else if (typeof char === "number") {
                if (char === level.at(-1)) {
                    insert.push(i);
                } else if (char > level.at(-1)) {
                    shift.push(i);
                }
                level.pop();
            }

            if (level.length === 0) return [i + 1, shift, insert];
        }

        return null;
    }

    function reduce() {
        for (let i = 1; i < expression.length; i++) {
            if (expression[i - 1] !== "*" || expression[i] !== "/") continue;

            const reduction = nextArgument(i);
            if (reduction === null) continue;
            const [index, shift, insert] = reduction;

            const toApplyIdx = nextArgument(index)[0];
            const toApply = expression.splice(index, toApplyIdx - index);

            for (let j = shift.length - 1; j >= 0; j--) {
                expression[shift[j]]--;
            }

            for (let j = insert.length - 1; j >= 0; j--) {
                expression.splice(insert[j], 1, ...toApply);
            }

            expression.splice(i - 1, 2);
            return true;
        }

        return false;
    }

    function step() {
        if (!reduce()) return status = "halted";

        // Increment steps count
        steps++;
        if (steps > maxSteps) return status = "timed out";
        if (expression.length > 10_000) return status = "timed out";
        return;
    }

    return {
        step,
        expression,
        get steps() {return steps;},
        get status() {return status;},
    }
}

export function decide(code, maxSteps) {
    const prog = newProgram(code, maxSteps);
    while (prog.status === "running") prog.step();

    return prog.status === "halted"
    ? ["halted", prog.steps]
    : ["undecided"];
}
