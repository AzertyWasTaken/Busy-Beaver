"use strict";
import {SYMBOL_COLORS} from "./colors.js";
import {createCanvas} from "./canvas.js";
import {parse} from "../Cyclic Tag System/parser.js";
import {newTag} from "../Cyclic Tag System/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
let code, program, history, scrollY;

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

function appendRow(canvasDim) {
    const {string, head} = program.getData();
    const colorTape = string.slice(head)
    .map((symbol) => SYMBOL_COLORS[symbol]);

    history.push([colorTape, -canvasDim.x / 2]);
}

function drawFrame() {
    canvas.reset();
    if (!code || !program) return;

    const canvasDim = canvas.getSize();

    // Complete the history
    for (let i = history.length; i < scrollY + canvasDim.y; i++) {
        const data = program.getData();
        if (data.status !== "running") break;
        appendRow(canvasDim);
        program.step();
    }

    // Draw rows
    let offset = 0;
    for (let i = scrollY; i < scrollY + canvasDim.y; i++) {
        if (!history[i]) break;
        const [colors, center] = history[i];
        canvas.drawRow(colors, center + offset);
        if (doOffset) offset++;
    }
}

// ==== Import ====

document.getElementById("import").addEventListener("click", () => {
    const input = document.getElementById("input").value;
    code = input.length === 0 ? undefined : parse(input);
    program = newTag(code, 1_000_000);
    history = [];
    scrollY = 0;
    drawFrame();
});

// ==== Scroll ====

const SCROLL_SPEED = 8;

canvasEl.addEventListener("wheel", (el) => {
    el.preventDefault();
    scrollY += Math.sign(el.deltaY) * SCROLL_SPEED;
    scrollY = Math.max(0, scrollY);
    drawFrame();
})
