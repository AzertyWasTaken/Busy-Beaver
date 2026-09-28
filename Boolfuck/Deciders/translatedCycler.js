"use strict";
import {newProgram} from "../runner.js";

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function sliceRightTape(tape, dist) {
    return tape.slice(tape.length - dist);
}

function sliceLeftTape(tape, dist) {
    return tape.slice(0, dist);
}

export function decide(code, maxSteps) {
    const program = newProgram(code, maxSteps);
    let record, distance, side, prev;
    let phase = 2;

    while (true) {
        program.step();
        const status = program.status;
        if (status === "halted") return ["halted", program.steps];
        if (status !== "running") return ["undecided"];

        const tape = program.tape;
        const state = program.state;
        const head = program.head;

        function saveConfig() {
            record = head;
            distance = 0;
            prev = {state, tape};
        }

        function nextPhase() {
            if (program.steps >= 2**phase) {
                phase++;
                return true;
            }
            return false;
        }

        if (program.isRecord) {
            if (head > 0) {
                if (side === "right" && prev.state === state) {
                    const a = sliceRightTape(prev.tape, distance);
                    const b = sliceRightTape(tape, distance);
                    if (compare(a, b)) return ["nonhalting"];
                }

                if (side !== "right" || nextPhase()) {
                    side = "right";
                    saveConfig();
                }
            } else if (head < 0) {
                if (side === "left" && prev.state === state) {
                    const a = sliceLeftTape(prev.tape, distance);
                    const b = sliceLeftTape(tape, distance);
                    if (compare(a, b)) return ["nonhalting"];
                }

                if (side !== "left" || nextPhase()) {
                    side = "left";
                    saveConfig();
                }
            }
        } else {
            if (side === "right") {
                distance = Math.max(distance, record - head);
            } else if (side === "left") {
                distance = Math.max(distance, head - record);
            }
        }
    }
}
