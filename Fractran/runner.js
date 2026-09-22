"use strict";
export function newProgram(code, maxSteps) {
    const register = [1];
    let steps = 0;
    let status = "running";
    let currCounter;

    function getValue(index) {
        const value = register[index];
        return value === null
        ? null : (value ?? 0);
    }

    function addValue(index, addend) {
        const value = register[index];
        register[index] = value === null || addend === null
        ? null : (value ?? 0) + addend;
    }

    function step() {
        if (status !== "running") return;

        // Search current instruction
        const instruction = code.find((row) =>
            row.every((col, cIdx) => {
                if (col === null || col >= 0) return true;

                const value = getValue(cIdx);
                if (value === null) {
                    currCounter = cIdx;
                    return false;
                }
                return value >= -col;
            })
        );

        // Check if the machine halted
        if (currCounter !== undefined) return status = "paused";
        if (!instruction) return status = "halted";

        // Update the register machine
        instruction.forEach((v, i) => addValue(i, v));

        // Increment steps count
        steps++;
        if (steps > maxSteps) return status = "timed out";
        return;
    }

    return {
        step,
        register,
        get steps() {return steps;},
        get status() {return status;},
        get currCounter() {return currCounter;},
    };
}

export function decide(code, maxSteps) {
    const prog = newProgram(code, maxSteps);
    while (prog.status === "running") prog.step();

    return prog.status === "halted"
    ? ["halted", prog.steps]
    : ["undecided"];
}
