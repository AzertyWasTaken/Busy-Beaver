"use strict";
import {SYMBOL_COLORS} from "./colors.js";
import {createCanvas} from "./canvas.js";
import {parse} from "../Post Tag System/parser.js";
import {newTag} from "../Post Tag System/runner.js";

// ==== Offset ====

const offsetButton = document.getElementById("offset");
let doOffset = false;

function toggleOffset() {
    doOffset = !doOffset;
    offsetButton.textContent = doOffset ? "On" : "Off";
    if (code) explore();
}

offsetButton.addEventListener("click", toggleOffset);

// ==== Canvas ====

const canvas = createCanvas(document.getElementById("canvas"));
let code;

function explore() {
    canvas.reset();
    if (!code) return;

    const canvasDim = canvas.getSize();
    const tag = newTag(code, canvasDim.y);
    let offset = 0;

    while (true) {
        // Create row color map
        const data = tag.getData();

        const colorTape = data.string
        .map((symbol) => SYMBOL_COLORS[symbol]);

        canvas.newRow(colorTape, -canvasDim.x / 2 + offset);

        // Perform a step
        const status = tag.step();
        if (status === "halted") break;
        if (status === "timed out") break;

        if (doOffset) offset += 2;
    }
}

document.getElementById("import").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    code = input.length === 0 ? undefined : parse(input);
    explore();
});
