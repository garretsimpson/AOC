/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const INPUT_FILENAME = 'input.txt';

const SIZE_X = 31;
let SIZE_Y = 0;
const MAP = [];

/**
 * Check MAP at position (x,y).
 *
 * @param {Number} x 
 * @param {Number} y 
 * @return {Boolean} Returns true if tree at (x,y), false otherwise.
 */
function isTree(x, y) {
    if (y < 0 || y >= MAP.length) {
        console.error('Invalid map position', x, y);
        return false;
    }
    let value = MAP[y];
    let pos = SIZE_X - (x % SIZE_X) - 1;
    if ((value & (1 << pos)) == 0) {
        return false;
    }
    return true;
}

/**
 * Count trees.
 *
 * @param {Slope} slope
 * @return {Boolean} Returns number of trees encountered.
 */
function countTrees(slope) {
    const START_X = 0;
    const START_Y = 0;

    let px = START_X;
    let py = START_Y;
    let numTrees = 0;

    while (py < SIZE_Y) {
        if (isTree(px, py)) {
            numTrees++;
        }
        px += slope.dx;
        py += slope.dy;
    }
    return numTrees;
}

function main() {
    console.log('Advent of Code 2020 - Day 3');
    console.log(Date());
    console.log('');

    // Read input file
    console.log('Read input file:', INPUT_FILENAME);
    let input;
    try {
        input = readFileSync(INPUT_FILENAME, 'utf8')
    } catch (err) {
        console.error(err)
        exit();
    }

    // Parse input file
    console.log('Parsing...');
    let data = input.toString().split(/\r?\n/);
    console.log('  length:', data.length);

    SIZE_Y = data.length;

    const OPEN_RE = /\./g;
    const TREE_RE = /#/g;

    // Build MAP
    // Convert input data to binary numbers
    for (let i = 0; i < data.length; i++) {
        let line = data[i];
        let value = line.replace(OPEN_RE, '0').replace(TREE_RE, 1);
        let num = parseInt(value, 2);
        MAP[i] = num;
        console.log(line, value, num);
    }
    console.log('');

    console.log('Part 1...');
    const SLOPE = {dx: 3, dy: 1};

    console.log('Result:', SLOPE, countTrees(SLOPE));
    console.log('');

    console.log('Part 2...');
    const SLOPES = [{dx: 3, dy: 1}];

    let result = 0;

    for (let i = 0; i < SLOPES.length; i++) {
        let slope = SLOPES[i];
        console.log('Result:', slope, countTrees(slope));
    }
    console.log('');
}

main();
