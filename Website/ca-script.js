"use strict";
import {SYMBOL_COLORS} from "./colors.js";
import {createCanvas} from "./canvas.js";
import {parse} from "../Cellular Automaton/parser.js";
import {newAutomaton} from "../Cellular Automaton/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
let code, program, history, scrollY;

// ==== Canvas ====

function appendRow() {
    const {tape} = program.getData();
    const colorTape = tape.map((symbol) => SYMBOL_COLORS[symbol - 1]);
    history.push(colorTape);
}

function drawFrame() {
    canvas.reset();
    if (!code || !program) return;

    const canvasDim = canvas.getSize();

    // Complete the history
    for (let i = history.length; i < scrollY + canvasDim.y; i++) {
        const data = program.getData();
        if (data.status !== "running") break;
        appendRow();
        program.step();
    }

    // Draw rows
    for (let i = scrollY; i < scrollY + canvasDim.y; i++) {
        if (!history[i]) break;
        canvas.drawRow(history[i], -canvasDim.x / 2);
    }
}

// ==== Import ====

document.getElementById("import").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    code = input.length === 0 ? undefined : parse(input);
    program = newAutomaton(code, 1_000_000);
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
