"use strict";
import {STATE_COLORS, SYMBOL_COLORS} from "./colors.js";
import {createCanvas, setupScroll, setupZoom} from "./canvas.js";
import {parse} from "../Boolfuck/parser.js";
import {newMachine} from "../Boolfuck/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
const stepsEl = document.getElementById("steps");
let code, program, history;
const scroll = {x: 0, y: 0};

// ==== Canvas ====

function appendRow(data) {
    let offsetX = -data.lTape.length;

    const colorTape = [0]
    .concat(data.lTape.toReversed())
    .concat(data.rTape)
    .map((symbol) => SYMBOL_COLORS[symbol - 1]);

    let headPos = data.head - offsetX + 1;
    while (headPos < 0) {
        headPos++;
        offsetX--;
        colorTape.unshift("#000000");
    }
    colorTape[headPos] = STATE_COLORS[0];

    history.push([colorTape, offsetX - 1]);
}

function drawFrame() {
    canvas.reset();
    if (!code || !program) {
        stepsEl.textContent = "Steps: 0";
        return;
    }

    const canvasDim = canvas.getSize();

    // Complete the history: brackets do not count as steps, so row i is the config after i steps
    let prevSteps = history.length - 1;
    while (history.length < scroll.y + canvasDim.y) {
        const data = program.getData();
        // Unbalanced brackets leave the state NaN
        if (data.status !== "running" || Number.isNaN(data.state)) break;

        if (data.steps > prevSteps) {
            appendRow(data);
        }
        prevSteps = data.steps;
        program.step();
    }

    stepsEl.textContent = "Steps: " + program.getData().steps.toLocaleString("en-US");

    // Draw rows
    for (let i = scroll.y; i < scroll.y + canvasDim.y; i++) {
        if (!history[i]) break;
        canvas.drawRow(history[i][0], history[i][1] - scroll.x);
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

setupScroll(canvasEl, canvas, drawFrame, scroll, false);
