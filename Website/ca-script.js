"use strict";
import {SYMBOL_COLORS} from "./colors.js";
import {createCanvas, setupScroll, setupZoom} from "./canvas.js";
import {parse} from "../Cellular Automaton/parser.js";
import {newAutomaton} from "../Cellular Automaton/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
let code, program, history;
const scroll = {x: 0, y: 0};

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
    for (let i = history.length; i < scroll.y + canvasDim.y; i++) {
        const data = program.getData();
        if (data.status !== "running") break;
        appendRow();
        program.step();
    }

    // Draw rows
    for (let i = scroll.y; i < scroll.y + canvasDim.y; i++) {
        if (!history[i]) break;
        canvas.drawRow(history[i], -canvasDim.x / 2 - scroll.x);
    }
}

// ==== Import ====

document.getElementById("import").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    code = input.length === 0 ? undefined : parse(input);
    program = newAutomaton(code, 1_000_000);
    history = [];
    scroll.x = 0;
    scroll.y = 0;
    drawFrame();
});

// ==== Zoom ====

setupZoom(canvas, drawFrame);

// ==== Scroll ====

setupScroll(canvasEl, canvas, drawFrame, scroll, true);
