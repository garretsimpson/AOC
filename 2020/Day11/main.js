/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 11';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;
let GRID = [[]];
let ROWS = 0, COLS = 0;
const FLOOR = '.';
const EMPTY = 'L';
const FULL = '#';

/**
 * Read input file.
 * @param {String} filename
 * @return {String} Return entire contents of the file.
 */
function readFile(filename) {
    console.log('Read input file:', INPUT_FILENAME);
    try {
        return readFileSync(INPUT_FILENAME, 'utf8')
    } catch (err) {
        console.error(err)
        exit();
    }
}

/**
 * Parse grid.  Returns a 2D array of items.  Access by a[row][col].
 * @param {String} data
 * @return {Array<Array<String>>} A 2D array.
 */
function parseGrid(data) {
    console.log('Parsing...');
    return data.toString().trim().split(EOL).map(s => s.split(''));
}

/**
 * Display grid.
 * @param {Array<Array<String>>} grid 2D array
 */
function displayGrid(grid) {
    console.log(grid.map(a => a.join('')).join('\n'));
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
            if (grid[r][c] == EMPTY) break;
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
                if ((value == EMPTY) && (func(grid, row, col) == 0)) {
                    value = FULL;
                    running = true;
                }
                else if ((value == FULL) && (func(grid, row, col) >= max)) {
                    value = EMPTY;
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

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    GRID = parseGrid(input);
    ROWS = GRID.length;
    COLS = GRID[0].length;
    console.log('Grid size: %dx%d', COLS, ROWS);
    displayGrid(GRID);
    console.log('');

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
