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

let canvas, ctx;

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
 * Display grid.
 * @param {Array<Array<String>>} grid 2D array
 */
function displayGrid(grid) {
    console.log(grid.map(a => a.join('')).join('\n'));

    if (ctx == undefined) return;
    const SIZE = 8;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';

    for (row = 0; row < ROWS; row++) {
        for (col = 0; col < COLS; col++) {
            let value = grid[row][col];
            let x = SIZE * col;
            let y = SIZE * row;
            ctx.beginPath();
            switch (value) {
                case FREE:
                    ctx.rect(x + 1, y + 1, SIZE - 2, SIZE - 2);
                    ctx.stroke();
                    break;
                case FULL:
                    ctx.arc(x + SIZE / 2, y + SIZE / 2, SIZE / 2 - 2, 0, 2 * Math.PI);
                    ctx.fill();
                    break;
            }
        }
    }
}

/**
 * Copy grid.
 * @param {Array<Array<String>>} grid 2D array
 * @return {Array<Array<String>>} 2D array
 */
function copyGrid(grid) {
    return grid.map(a => a.slice());
}

const OFFSET = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

/**
 * Count adjacent occupied seats.
 * @param {Array<Array<String>>} grid 2D array
 * @param {Number} row
 * @param {Number} col
 * @return {Number}
 */
function countNear(grid, row, col) {
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
 * @param {Array<Array<String>>} grid 2D array
 * @param {Number} row
 * @param {Number} col
 * @return {Number}
 */
function countSeen(grid, row, col) {
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
 * Run the rules iteratively.  Stops when the grid does not change.
 * @param {Array<Array<String>>} grid 2D array
 * @param {Function} func Counting Function
 * @param {Number} max Maximum number of occupied seats
 */
function runRules(grid, func, max) {
    let running = true;
    let num = 1;
    while (running) {
        console.log('Iteration #%d', num);
        let newGrid = Array(ROWS);
        running = false;
        for (let row = 0; row < ROWS; row++) {
            newGrid[row] = Array(COLS);
            for (let col = 0; col < COLS; col++) {
                let value = grid[row][col];
                if ((value == FREE) && (func(grid, row, col) == 0)) {
                    value = FULL;
                    running = true;
                }
                else if ((value == FULL) && (func(grid, row, col) >= max)) {
                    value = FREE;
                    running = true;
                }
                newGrid[row][col] = value;
            }
        }
        // Copy to existing array
        Object.keys(grid).map(key => grid[key] = newGrid[key]);
        displayGrid(grid);
        num++;
    }
}

function initCanvas() {
    if (typeof document == 'undefined') return;
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    if (typeof INPUT == 'undefined') {
        INPUT = readInputFile();
    }
    const GRID = parseGrid(INPUT);
    ROWS = GRID.length;
    COLS = GRID[0].length;
    console.log('Grid size: %dx%d', COLS, ROWS);
    displayGrid(GRID);
    console.log('');

    initCanvas();

    console.log('Part 1...');
    let grid1 = copyGrid(GRID);
    runRules(grid1, countNear, 4);
    let num1 = grid1.map(a => a.filter(v => v == FULL).length).reduce((a, v) => a + v);
    console.log('Number:', num1);
    console.log('');

    console.log('Part 2...');
    let grid2 = copyGrid(GRID);
    runRules(grid2, countSeen, 5);
    let num2 = grid2.map(a => a.filter(v => v == FULL).length).reduce((a, v) => a + v);
    console.log('Number:', num2);
    console.log('');
}

main();
