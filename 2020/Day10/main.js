/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 10';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;
let NUMBERS = [];

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
 * Parse items.
 * @param {String} data
 * @return {Array<String>} An Array of items.
 */
function parseItems(data) {
    console.log('Parsing...');
    return data.toString().trim().split(EOL);
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    NUMBERS = items.map(x => parseInt(x));
    NUMBERS.sort((a, b) => a - b);
    console.log('');

    console.log('Part 1...');
    // Insert source (0) and target (last + 3)
    NUMBERS = [0, ...NUMBERS, NUMBERS[NUMBERS.length - 1] + 3];
    const deltas = NUMBERS.map((v, i, a) => a[i + 1] - a[i]);
    const d1 = deltas.filter(v => v == 1).length;
    const d3 = deltas.filter(v => v == 3).length;
    console.log("Result:", d1, d3, d1 * d3);
    console.log('');
}

main();
