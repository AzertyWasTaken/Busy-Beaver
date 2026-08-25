"use strict";
export function createCanvas(canvas) {
    const CELL_SIZE = 8;
    const ctx = canvas.getContext("2d");
    let rows = 0;

    function drawPixel(x, y) {
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    function reset() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rows = 0;
    }

    function getSize() {
        return {
            x: Math.ceil(canvas.width / CELL_SIZE),
            y: Math.ceil(canvas.height / CELL_SIZE)
        };
    }

    function newRow(rowArray, offsetX) {
        const cells = getSize().x;
        const half = cells / 2;

        for (let x = 0; x < rowArray.length; x++) {
            ctx.fillStyle = rowArray[x] ?? "#000000";
            drawPixel(x + half + offsetX, rows);
        }

        rows++;
    }

    return {reset, newRow, getSize};
}
