/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 14';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;

/**
 * Read input file.
 * @param {String} filename
 * @return {String} Return entire contents of the file.
 */
function readFile(filename) {
    const { readFileSync } = require('fs');
    console.log('Read input file:', INPUT_FILENAME);
    return readFileSync(INPUT_FILENAME, 'utf8')
}

/**
 * Parse items.
 * @param {String} data
 * @return {Array<Array<String>>} An array of items.
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
    console.log('');

    console.log('Part 1...');
    console.log('');
}

main();
