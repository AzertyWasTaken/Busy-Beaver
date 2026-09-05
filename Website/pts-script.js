"use strict";
import {SYMBOL_COLORS} from "./colors.js";
import {createCanvas, setupScroll, setupZoom} from "./canvas.js";
import {parse} from "../Post Tag System/parser.js";
import {newTag} from "../Post Tag System/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
let code, program, history;
const scroll = {x: 0, y: 0};

// ==== Offset ====

const offsetButton = document.getElementById("offset");
let doOffset = false;

function toggleOffset() {
    doOffset = !doOffset;
    offsetButton.textContent = doOffset ? "On" : "Off";
    if (code) drawFrame();
}

offsetButton.addEventListener("click", toggleOffset);

// ==== Canvas ====

function appendRow() {
    const {string, head} = program.getData();
    const colorTape = string.slice(head)
    .map((symbol) => SYMBOL_COLORS[symbol]);

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
        if (program.getData().status !== "running")
            appendRow();
    }

    // Draw rows
    let offset = 0;
    for (let i = scroll.y; i < scroll.y + canvasDim.y; i++) {
        if (!history[i]) break;
        canvas.drawRow(history[i], -canvasDim.x / 2 + offset - scroll.x);
        if (doOffset) offset += 2;
    }
}

// ==== Import ====

document.getElementById("import").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    code = input.length === 0 ? undefined : parse(input);
    program = newTag(code, 1_000_000);
    history = [];
    scroll.x = 0;
    scroll.y = 0;
    drawFrame();
});

// ==== Zoom ====

setupZoom(canvas, drawFrame);

// ==== Scroll ====

setupScroll(canvasEl, canvas, drawFrame, scroll, true);
