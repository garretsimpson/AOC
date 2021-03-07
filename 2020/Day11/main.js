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
 */
function displayGrid() {
    console.log(GRID.map(a => a.join('')).join('\n'));
}

const NEARBY = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

/**
 * Count adjacent occupied seats.
 * @param {Number} row
 * @param {Number} col
 * @return {Number}
 */
function countFull(row, col) {
    let count = 0;
    for (let pos of NEARBY) {
        let r = row + pos[0];
        let c = col + pos[1];
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
        if (GRID[r][c] == FULL) {
            count++;
        }
    }
    return count;
}

/**
 * Run the rules iteratively.  Stops when the grid does not change.
 */
function runRules() {
    let running = true;
    let num = 1;
    while (running) {
        console.log('Iteration #%d', num);
        let newGrid = Array(ROWS);
        running = false;
        for (let row = 0; row < ROWS; row++) {
            newGrid[row] = Array(COLS);
            for (let col = 0; col < COLS; col++) {
                let value = GRID[row][col];
                if ((value == EMPTY) && (countFull(row, col) == 0)) {
                    value = FULL;
                    running = true;
                }
                else if ((value == FULL) && (countFull(row, col) >= 4)) {
                    value = EMPTY;
                    running = true;
                }
                newGrid[row][col] = value;
            }
        }
        GRID = newGrid;
        displayGrid();
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
    displayGrid();
    console.log('');

    console.log('Part 1...');
    runRules();
    let num = GRID.map(a => a.filter(v => v == FULL).length).reduce((a, v) => a + v);
    console.log('Number:', num);
    console.log('');
}

main();
