"use strict";
export function createCanvas(canvas) {
    const CELL_SIZES = [1, 2, 4, 8, 16, 32];
    let sizeIndex = CELL_SIZES.indexOf(8);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    const LITTLE_ENDIAN = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
    const packedColors = new Map();

    let offscreen = null;
    let offCtx = null;
    let imageData = null;
    let pixels = null;
    let cells = 0;
    let bufferRows = 0;
    let rows = 0;
    let flushPending = false;

    function cellSize() {
        return CELL_SIZES[sizeIndex];
    }

    function packColor(color) {
        let packed = packedColors.get(color);
        if (packed === undefined) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            packed = LITTLE_ENDIAN
            ? 0xFF000000 | (b << 16) | (g << 8) | r
            : (r << 24) | (g << 16) | (b << 8) | 0xFF;
            packedColors.set(color, packed);
        }
        return packed;
    }

    const BLACK = packColor("#000000");

    // Rows are drawn into an offscreen buffer (one pixel per cell) and painted once per animation frame.
    function reset() {
        const width = Math.ceil(canvas.width / cellSize());
        const height = Math.ceil(canvas.height / cellSize());
        if (width !== cells || height !== bufferRows) {
            cells = width;
            bufferRows = height;
            offscreen = document.createElement("canvas");
            offscreen.width = width;
            offscreen.height = height;
            offCtx = offscreen.getContext("2d");
            imageData = offCtx.createImageData(width, height);
            pixels = new Uint32Array(imageData.data.buffer);
        }
        pixels.fill(BLACK);
        rows = 0;
        scheduleFlush();
    }

    function drawRow(rowArray, offsetX) {
        const half = cells / 2;

        // Draw only the visible cells: 0 <= x + half + offsetX < cells
        const start = Math.max(0, Math.ceil(-half - offsetX));
        const end = Math.min(rowArray.length, Math.floor(cells - half - offsetX));

        const rowOffset = rows * cells;
        let px = (rowOffset + start + half + offsetX) | 0;
        let color = null;
        let packed = BLACK;
        for (let x = start; x < end; x++) {
            const next = rowArray[x];
            if (next !== color) {
                color = next;
                packed = next != null ? packColor(next) : BLACK;
            }
            pixels[px++] = packed;
        }

        rows++;
        scheduleFlush();
    }

    function getSize() {
        return {
            x: Math.ceil(canvas.width / cellSize()),
            y: Math.ceil(canvas.height / cellSize())
        };
    }

    function zoomIn() {
        sizeIndex = Math.min(sizeIndex + 1, CELL_SIZES.length - 1);
    }

    function zoomOut() {
        sizeIndex = Math.max(sizeIndex - 1, 0);
    }

    function scheduleFlush() {
        if (flushPending) return;
        flushPending = true;
        requestAnimationFrame(flush);
    }

    function flush() {
        flushPending = false;
        if (!offscreen) return;
        offCtx.putImageData(imageData, 0, 0);
        ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
    }

    return {
        reset, drawRow, getSize, zoomIn, zoomOut,
        get CELL_SIZE() {return cellSize();},
        get canZoomIn() {return sizeIndex < CELL_SIZES.length - 1;},
        get canZoomOut() {return sizeIndex > 0;}
    };
}

export function setupZoom(canvas, drawFrame) {
    const zoomInButton = document.getElementById("zoom-in");
    const zoomOutButton = document.getElementById("zoom-out");

    function updateButtons() {
        zoomInButton.disabled = !canvas.canZoomIn;
        zoomOutButton.disabled = !canvas.canZoomOut;
    }

    zoomInButton.addEventListener("click", () => {
        canvas.zoomIn();
        updateButtons();
        drawFrame();
    });

    zoomOutButton.addEventListener("click", () => {
        canvas.zoomOut();
        updateButtons();
        drawFrame();
    });

    updateButtons();
}

const SCROLL_PIXELS = 64;

export function setupScroll(canvasEl, canvas, drawFrame, scroll, clampX) {
    canvasEl.addEventListener("wheel", (el) => {
        el.preventDefault();
        if (el.shiftKey || Math.abs(el.deltaX) > Math.abs(el.deltaY)) {
            scroll.x += Math.sign(el.deltaX || el.deltaY) * (SCROLL_PIXELS / canvas.CELL_SIZE);
            if (clampX) scroll.x = Math.max(0, scroll.x);
        } else {
            scroll.y += Math.sign(el.deltaY) * (SCROLL_PIXELS / canvas.CELL_SIZE);
            scroll.y = Math.max(0, scroll.y);
        }
        drawFrame();
    });

    // Drag the canvas with the mouse or touch to pan the view.
    let activePointerId = null;
    let startClientX = 0;
    let startClientY = 0;
    let startScrollX = 0;
    let startScrollY = 0;

    canvasEl.addEventListener("pointerdown", (el) => {
        if (el.button !== 0 || activePointerId !== null) return;
        activePointerId = el.pointerId;
        startClientX = el.clientX;
        startClientY = el.clientY;
        startScrollX = scroll.x;
        startScrollY = scroll.y;
        canvasEl.setPointerCapture(el.pointerId);
    });

    canvasEl.addEventListener("pointermove", (el) => {
        if (el.pointerId !== activePointerId) return;
        scroll.x = Math.round(startScrollX - (el.clientX - startClientX) / canvas.CELL_SIZE);
        scroll.y = Math.round(startScrollY - (el.clientY - startClientY) / canvas.CELL_SIZE);
        if (clampX) scroll.x = Math.max(0, scroll.x);
        scroll.y = Math.max(0, scroll.y);
        drawFrame();
    });

    canvasEl.addEventListener("pointerup", (el) => {
        if (el.pointerId === activePointerId) activePointerId = null;
    });

    canvasEl.addEventListener("pointercancel", (el) => {
        if (el.pointerId === activePointerId) activePointerId = null;
    });
}
