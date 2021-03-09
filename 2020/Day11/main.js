/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 11';
const EOL = /\r?\n/;

let ROWS = 0, COLS = 0;
const FLOOR = '.';
const FREE = 'L';
const FULL = '#';
let grid = [[]];

/**
 * Read input file.
 * @return {String} Return entire contents of the file as a string.
 */
function readInputFile() {
    const { readFileSync } = require('fs');
    const INPUT_FILENAME = 'input.txt';
    console.log('Read input file:', INPUT_FILENAME);
    return readFileSync(INPUT_FILENAME, 'utf8').toString();
}

/**
 * Parse grid.  Returns a 2D array of items.  Access by a[row][col].
 * @param {String} data
 * @return {Array<Array<String>>} A 2D array.
 */
function parseGrid(data) {
    console.log('Parsing...');
    return data.trim().split(EOL).map(s => s.split(''));
}

/**
 * Log grid to the console.
 * @param {Array<Array<String>>} grid 2D array
 */
function logGrid() {
    console.log(grid.map(a => a.join('')).join('\n'));
}

let canvas, ctx;

/**
 * If an HTML document exists, then initialize the canvas.  Otherwise do nothing.
 */
function initCanvas() {
    if (typeof document == 'undefined')
        return;
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Draw grid on the canvas.
 * @param {Array<Array<String>>} grid 2D array
 */
function drawGrid() {
    if (ctx == undefined)
        return;

    const SIZE = 6;
    const X_OFFSET = 30;
    const Y_OFFSET = 30;

    ctx.linewidth = 0;

    for (row = 0; row < ROWS; row++) {
        for (col = 0; col < COLS; col++) {
            let value = grid[row][col];
            let x = SIZE * col + X_OFFSET;
            let y = SIZE * row + Y_OFFSET;
            if (value == FREE || value == FULL) {
                ctx.fillStyle = 'lightblue';
                ctx.beginPath();
                ctx.rect(x, y, SIZE, SIZE);
                ctx.fill();
            }
            if (value == FULL) {
                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.rect(x + 2, y + 2, SIZE - 4, SIZE - 4);
                ctx.fill();
            }
        }
    }
}

const OFFSET = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

/**
 * Count adjacent occupied seats.
 * @param {Array<Array<String>>} grid 2D array
 * @param {Number} row
 * @param {Number} col
 * @return {Number}
 */
function countNear(row, col) {
    let count = 0;
    for (let pos of OFFSET) {
        let r = row + pos[0];
        let c = col + pos[1];
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
        if (grid[r][c] == FULL) {
            count++;
        }
    }
    return count;
}

/**
 * Count seen occupied seats.
 * @param {Number} row
 * @param {Number} col
 * @return {Number}
 */
function countSeen(row, col) {
    let count = 0;
    for (let dir of OFFSET) {
        let r = row;
        let c = col;
        while (true) {
            r += dir[0];
            c += dir[1];
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS) break;
            if (grid[r][c] == FREE) break;
            if (grid[r][c] == FULL) {
                count++;
                break;
            }
        }
    }
    return count;
}

/**
 * Update the grid.
 * @param {Function} func Counting Function.
 * @param {Number} max Maximum number of occupied seats.
 * @return {Boolean} Return true if there was a change.  Otherwise return false.
 */
function updateGrid(func, max) {
    let changed = false;
    let newGrid = Array(ROWS);
    for (let row = 0; row < ROWS; row++) {
        newGrid[row] = Array(COLS);
        for (let col = 0; col < COLS; col++) {
            let value = grid[row][col];
            if ((value == FREE) && (func(row, col) == 0)) {
                value = FULL;
                changed = true;
            }
            else if ((value == FULL) && (func(row, col) >= max)) {
                value = FREE;
                changed = true;
            }
            newGrid[row][col] = value;
        }
    }
    grid = newGrid;
    return changed;
}

/**
 * Run the rules.
 * If a canvas context exists, then use animation to draw to the canvas.
 * @param {Function} func Counting Function.
 * @param {Number} max Maximum number of occupied seats.
 */
function runRules(func, max) {
    return new Promise((resolve, reject) => {
        function step(ts) {
            console.log(ctx.gridFunc.name, ts);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            if (updateGrid(ctx.gridFunc, ctx.gridMax)) {
                requestAnimationFrame(step);
            }
            else {
                resolve();
            }
        }
        // If there is no canvas context, then just loop and write to console log.
        // let i = 1;
        if (ctx == undefined) {
            while (updateGrid(func, max)) {
                // console.log('Iteration #%d', i++);
                // logGrid();
            }
            resolve();
        }
        else {
            // Otherwise use animation to draw to the canvas
            ctx.gridFunc = func;
            ctx.gridMax = max;
            requestAnimationFrame(step);
        }
    })
}

async function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    if (typeof INPUT == 'undefined') {
        INPUT = readInputFile();
    }
    grid = parseGrid(INPUT);
    ROWS = grid.length;
    COLS = grid[0].length;
    console.log('Grid size: %dx%d', COLS, ROWS);
    logGrid();
    console.log('');

    initCanvas();

    console.log('Part 1...');
    await runRules(countNear, 4);
    let num1 = grid.map(a => a.filter(v => v == FULL).length).reduce((a, v) => a + v);
    console.log('Number:', num1);
    console.log('');

    console.log('Part 2...');
    grid = parseGrid(INPUT);
    await runRules(countSeen, 5);
    let num2 = grid.map(a => a.filter(v => v == FULL).length).reduce((a, v) => a + v);
    console.log('Number:', num2);
    console.log('');
}

main();
