"use strict";
import {STATE_COLORS, SYMBOL_COLORS} from "./colors.js";
import {createCanvas} from "./canvas.js";
import {parse} from "../Turing Machine/parser.js";
import {newMachine} from "../Turing Machine/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
let code, program, history, scrollY;

// ==== Canvas ====

function appendRow(data) {
    const offsetX = -data.lTape.length;

    const colorTape = [0]
    .concat(data.lTape.toReversed())
    .concat(data.rTape)
    .map((symbol) => SYMBOL_COLORS[symbol - 1]);

    colorTape[data.head - offsetX + 1] = STATE_COLORS[data.state];

    history.push([colorTape, offsetX]);
}

function drawFrame() {
    canvas.reset();
    if (!code || !program) return;

    const canvasDim = canvas.getSize();

    // Complete the history
    for (let i = history.length; i < scrollY + canvasDim.y; i++) {
        const data = program.getData();
        if (data.status !== "running") break;
        appendRow(data);
        program.step();
    }

    // Draw rows
    for (let i = scrollY; i < scrollY + canvasDim.y; i++) {
        if (!history[i]) break;
        canvas.drawRow(...history[i]);
    }
}

// ==== Import ====

document.getElementById("import").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    code = input.length === 0 ? undefined : parse(input);
    program = newMachine(code, 1_000_000);
    history = [];
    scrollY = 0;
    drawFrame();
});

// ==== Zoom ====

document.getElementById("zoom-in").addEventListener("click", () => {
    canvas.zoomIn();
    drawFrame();
});

document.getElementById("zoom-out").addEventListener("click", () => {
    canvas.zoomOut();
    drawFrame();
});

// ==== Scroll ====

const SCROLL_PIXELS = 64;

canvasEl.addEventListener("wheel", (el) => {
    el.preventDefault();
    scrollY += Math.sign(el.deltaY) * (SCROLL_PIXELS / canvas.CELL_SIZE);
    scrollY = Math.max(0, scrollY);
    drawFrame();
})
