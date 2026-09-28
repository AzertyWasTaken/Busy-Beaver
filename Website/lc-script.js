"use strict";
import {STATE_COLORS, SYMBOL_COLORS} from "./colors.js";
import {createCanvas, setupScroll, setupZoom} from "./canvas.js";
import {parse} from "../Lambda Calculus/parser.js";
import {newProgram} from "../Lambda Calculus/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
const stepsEl = document.getElementById("steps");
let code, program, history;
const scroll = {x: 0, y: 0};

// ==== Canvas ====

function appendRow() {
    const colorTape = program.expression
    .map((symbol) => 
        symbol === "/" ? STATE_COLORS[0]
        : symbol === "*" ? STATE_COLORS[1]
        : SYMBOL_COLORS[symbol]
    );

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
        if (program.status !== "running") break;
        appendRow();
        program.step();
    }

    stepsEl.textContent = "Steps: " + program.steps.toLocaleString("en-US");

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
    program = newProgram(code, 1_000_000);
    history = [];
    scroll.x = 0;
    scroll.y = 0;
    drawFrame();
});

// ==== Zoom ====

setupZoom(canvas, drawFrame);

// ==== Scroll ====

setupScroll(canvasEl, canvas, drawFrame, scroll, true);
