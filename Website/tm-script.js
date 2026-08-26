"use strict";
import {STATE_COLORS, SYMBOL_COLORS} from "./colors.js";
import {createCanvas} from "./canvas.js";
import {parse} from "../Turing Machine/parser.js";
import {newMachine} from "../Turing Machine/runner.js";

// ==== Canvas ====

const canvas = createCanvas(document.getElementById("canvas"));
let code;

function explore() {
    canvas.reset();
    if (!code) return;

    const canvasDim = canvas.getSize();
    const machine = newMachine(code, canvasDim.y);

    function newRow() {
        const data = machine.getData();
        const offsetX = -data.lTape.length;

        const colorTape = [0]
        .concat(data.lTape.toReversed())
        .concat(data.rTape)
        .map((symbol) => SYMBOL_COLORS[symbol - 1]);

        colorTape[data.head - offsetX + 1] = STATE_COLORS[data.state];

        canvas.newRow(colorTape, offsetX);
    }

    while (true) {
        newRow();
        const status = machine.step();
        if (status === "halted") break;
        if (status === "timed out") break;
    }
}

document.getElementById("import").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    code = input.length === 0 ? undefined : parse(input);
    explore();
});
