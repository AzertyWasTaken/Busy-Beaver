"use strict";
import {newMachine} from "../runner.js";

const MAX_STEPS = 1_000;

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function isRecord(machine) {
    const {lTape, rTape, head} = machine.getData();

    if (head < 0) {
        if (-head - 1 >= lTape.length) return true;
    } else {
        if (head >= rTape.length) return true;
    }
    return false;
}

function sliceRightTape(left, right, dist) {
    const fullTape = [...left.toReversed(), ...right];
    return fullTape.slice(fullTape.length - dist);
}

function sliceLeftTape(left, right, dist) {
    const fullTape = [...left.toReversed(), ...right];
    return fullTape.slice(0, dist);
}

export function decTranslatedCycler(code) {
    const machine = newMachine(code, MAX_STEPS);
    let record, distance, side, prev;
    let phase = 2;

    while (true) {
        const status = machine.step();
        if (status === "halted") return true;
        if (status === "timed out") return false;

        const {state, head, lTape, rTape, steps}
        = machine.getData();

        function saveConfig() {
            record = head;
            distance = 0;
            prev = {
                state: state,
                lTape: [...lTape],
                rTape: [...rTape]
            };
        }

        function nextPhase() {
            if (steps >= 2**phase) {
                phase++;
                return true;
            }
            return false;
        }

        if (isRecord(machine)) {
            if (head > 0) {
                if (side === "right" && prev.state === state) {
                    const a = sliceRightTape(prev.lTape, prev.rTape, distance);
                    const b = sliceRightTape(lTape, rTape, distance);
                    if (compare(a, b)) return true;
                }

                if (side !== "right" || nextPhase()) {
                    side = "right";
                    saveConfig();
                }
            } else if (head < 0) {
                if (side === "left" && prev.state === state) {
                    const a = sliceLeftTape(prev.lTape, prev.rTape, distance);
                    const b = sliceLeftTape(lTape, rTape, distance);
                    if (compare(a, b)) return true;
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
