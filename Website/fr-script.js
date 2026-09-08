"use strict";
import {STATE_COLORS, SYMBOL_COLORS} from "./colors.js";
import {createCanvas, setupScroll, setupZoom} from "./canvas.js";
import {parse} from "../Fractran/parser.js";
import {newMachine} from "../Fractran/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
const stepsEl = document.getElementById("steps");
let code, program, history;
const scroll = {x: 0, y: 0};

// ==== Canvas ====

function appendRow(data) {
    const colorTape = [];
    data.register.forEach((e, i) => {
        for (let a = 0; a < e; a++)
            colorTape.push(SYMBOL_COLORS[i]);
    })
    
    history.push(colorTape);
}

function drawFrame() {
    canvas.reset();
    if (!code || !program) {
        stepsEl.textContent = "Steps: 0";
        return;
    }

    const canvasDim = canvas.getSize();

    // Complete the history
    for (let i = history.length; i < scroll.y + canvasDim.y; i++) {
        const data = program.getData();
        if (data.status !== "running") break;
        appendRow(data);
        program.step();
    }

    stepsEl.textContent = "Steps: " + program.getData().steps.toLocaleString("en-US");

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
    
    program = newMachine(code, 1_000_000);
    history = [];
    scroll.x = 0;
    scroll.y = 0;
    drawFrame();
});

// ==== Zoom ====

setupZoom(canvas, drawFrame);

// ==== Scroll ====

setupScroll(canvasEl, canvas, drawFrame, scroll, true);
