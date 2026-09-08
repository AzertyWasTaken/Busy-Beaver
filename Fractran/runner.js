"use strict";
export function newMachine(code, maxSteps) {
    let register = [1];
    let steps = 0;
    let status = "running";

    function step() {
        if (status !== "running") return;

        // Search current instruction
        const instruction = code.find((e) =>
            e.every((f, i) =>
                f >= 0 || ((register[i] ?? 0) >= -f)
            )
        );

        // Check if the machine halted
        if (!instruction) {
            status = "halted";
            return;
        }

        // Update the register machine
        instruction.forEach((e, i) =>
            register[i] = (register[i] ?? 0) + e
        )

        // Increment steps count
        steps++;
        if (steps > maxSteps) status = "timed out";
        return;
    }

    function run() {
        while (true) {
            step();
            if (status === "halted") return steps;
            if (status === "timed out") return -1;
        }
    }

    function getData() {        
        return {register, steps, status};
    }

    return {step, run, getData};
}
