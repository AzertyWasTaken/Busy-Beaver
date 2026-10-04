"use strict";
import {STATE_COLORS, SYMBOL_COLORS} from "./colors.js";
import {createCanvas, setupScroll, setupZoom} from "./canvas.js";
import {parse} from "../Boolfuck/parser.js";
import {newProgram} from "../Boolfuck/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
const stepsEl = document.getElementById("steps");
let code, program, history, loopCache;
const scroll = {x: 0, y: 0};

function createCache() {
    loopCache = [];
    let loopId = 0;
    let stack = [loopId];

    for (let i = 0; i < code.length; i++) {
        loopCache[i] = stack.at(-1);
        const instr = code[i];

        if (instr === 3) {
            loopId++;
            stack.push(loopId);
        }
        else if (instr === 4) {
            stack.pop();
        }
    }    
}

// ==== Canvas ====

function appendRow() {
    const colorTape = program.tape
    .map((symbol) => SYMBOL_COLORS[symbol - 1]);

    let offsetX = -program.offset;
    let headPos = program.head - offsetX;

    while (headPos < 0) {
        offsetX--;
        headPos++;
        colorTape.unshift("#000000");
    }

    colorTape[headPos] = STATE_COLORS[loopCache[program.state]];
    history.push([colorTape, offsetX]);
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
        // Unbalanced brackets leave the state NaN
        if (program.status !== "running" || Number.isNaN(program.state)) break;

        if (program.steps > prevSteps) appendRow();
        prevSteps = program.steps;
        program.step();
    }

    stepsEl.textContent = "Steps: " + program.steps.toLocaleString("en-US");

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
    createCache();
    program = newProgram(code, 1_000_000);
    history = [];
    scroll.x = 0;
    scroll.y = 0;
    drawFrame();
});

// ==== Zoom ====

setupZoom(canvas, drawFrame);

// ==== Scroll ====

setupScroll(canvasEl, canvas, drawFrame, scroll, false);
