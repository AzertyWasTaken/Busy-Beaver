"use strict";
import {STATE_COLORS, SYMBOL_COLORS} from "./colors.js";
import {createCanvas} from "./canvas.js";
import {parse} from "../Turing Machine/parser.js";
import {newMachine} from "../Turing Machine/runner.js";

const canvas = createCanvas(document.getElementById("canvas"));

function explore() {
    canvas.reset();

    const maxSteps = canvas.getSize().y;
    const code = parse(document.getElementById("input").value);
    const machine = newMachine(code, maxSteps);

    let y = 0;
    while (true) {
        // Increment rows counter
        y++;
        if (y > maxSteps) break;

        // Create row color map
        const data = machine.getData();
        const offsetX = -data.lTape.length;

        const colorTape = [0]
        .concat(data.lTape.toReversed())
        .concat(data.rTape)
        .map((symbol) => SYMBOL_COLORS[symbol - 1]);

        colorTape[data.head - offsetX + 1] = STATE_COLORS[data.state];

        canvas.newRow(colorTape, offsetX);

        // Perform a step
        const status = machine.step();
        if (status === "halted") break;
        if (status === "timed out") break;
    }
}

document.getElementById("import").addEventListener("click", explore);
