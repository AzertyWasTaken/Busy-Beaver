"use strict";
import {SYMBOL_COLORS} from "./colors.js";
import {createCanvas} from "./canvas.js";
import {parse} from "../Cyclic Tag System/parser.js";
import {newTag} from "../Cyclic Tag System/runner.js";

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

    function newRow() {
        const {string, head} = tag.getData();
        const colorTape = string.slice(head)
        .map((symbol) => SYMBOL_COLORS[symbol]);

        canvas.newRow(colorTape, -canvasDim.x / 2 + offset);
        if (doOffset) offset++;
    }

    while (true) {
        newRow();
        const status = tag.step();
        if (status === "halted") break;
        if (status === "timed out") break;
    }
}

document.getElementById("import").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    code = input.length === 0 ? undefined : parse(input);
    explore();
});
