"use strict";
import {SYMBOL_COLORS} from "./colors.js";
import {createCanvas, setupScroll, setupZoom} from "./canvas.js";
import {parse} from "../Cellular Automaton/parser.js";
import {newAutomaton} from "../Cellular Automaton/runner.js";

// ==== Initialize ====

const canvasEl = document.getElementById("canvas");
const canvas = createCanvas(canvasEl);
const stepsEl = document.getElementById("steps");
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
    if (!code || !program) {
        stepsEl.textContent = "Steps: 0";
        return;
    }

    const canvasDim = canvas.getSize();

    // Complete the history
    for (let i = history.length; i < scroll.y + canvasDim.y; i++) {
        const data = program.getData();
        if (data.status !== "running") break;
        appendRow();
        program.step();
    }

    stepsEl.textContent = "Steps: " + program.getData().steps.toLocaleString("en-US");

    // Draw rows
    for (let i = scroll.y; i < scroll.y + canvasDim.y; i++) {
        if (!history[i]) break;
        canvas.drawRow(history[i], -canvasDim.x / 2 - scroll.x);
    }
}

// ==== Code ====

const codeSection = document.getElementById("code-section");
const codeCanvasEl = document.getElementById("code-canvas");
const codeCtx = codeCanvasEl.getContext("2d");

const CODE_CELL = 24;
const CODE_GAP = 8;
const ARROW_WIDTH = 12;
const HALT_COLOR = "#FF0000";

function drawCodeCell(x, y, color) {
    codeCtx.fillStyle = color ?? "#000000";
    codeCtx.fillRect(x, y, CODE_CELL, CODE_CELL);
    codeCtx.strokeStyle = "#404040";
    codeCtx.strokeRect(x + 0.5, y + 0.5, CODE_CELL - 1, CODE_CELL - 1);
}

function drawCodeArrow(x, y) {
    codeCtx.fillStyle = "#FFFFFF";
    codeCtx.beginPath();
    codeCtx.moveTo(x, y - ARROW_WIDTH / 2);
    codeCtx.lineTo(x + ARROW_WIDTH, y);
    codeCtx.lineTo(x, y + ARROW_WIDTH / 2);
    codeCtx.fill();
}

// Draws the rule table: each rule is its neighborhood, an arrow and its result symbol.
function renderCode() {
    codeSection.hidden = !code;
    if (!code) return;

    codeCtx.clearRect(0, 0, codeCanvasEl.width, codeCanvasEl.height);
    // Same decoding as the runner
    const symbols = code[0] + 1;
    const ruleSpan = Math.round(Math.log(code.length) / Math.log(symbols));
    const ruleWidth = (ruleSpan + 1) * CODE_CELL + ARROW_WIDTH + CODE_GAP;
    const perRow = Math.max(1, Math.floor((codeCanvasEl.width - CODE_GAP) / (ruleWidth + CODE_GAP)));
    const rowCount = Math.ceil((code.length - 1) / perRow);

    const height = rowCount * (CODE_CELL + CODE_GAP) + CODE_GAP;
    if (codeCanvasEl.height !== height) codeCanvasEl.height = height;

    for (let idx = 1; idx < code.length; idx++) {
        const x = CODE_GAP + ((idx - 1) % perRow) * (ruleWidth + CODE_GAP);
        const y = CODE_GAP + Math.floor((idx - 1) / perRow) * (CODE_CELL + CODE_GAP);

        // Neighborhood digits, from the leftmost neighbor cell to the cell itself
        for (let j = ruleSpan - 1; j >= 0; j--)
            drawCodeCell(x + (ruleSpan - 1 - j) * CODE_CELL, y, SYMBOL_COLORS[Math.floor(idx / symbols ** j) % symbols - 1]);

        drawCodeArrow(x + ruleSpan * CODE_CELL + CODE_GAP / 2, y + CODE_CELL / 2);

        const result = code[idx];
        drawCodeCell(x + ruleSpan * CODE_CELL + CODE_GAP + ARROW_WIDTH, y, result === null ? HALT_COLOR : SYMBOL_COLORS[result - 1]);
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
    renderCode();
    drawFrame();
});

// ==== Zoom ====

setupZoom(canvas, drawFrame);

// ==== Scroll ====

setupScroll(canvasEl, canvas, drawFrame, scroll, true);
