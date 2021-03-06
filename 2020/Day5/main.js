/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 5';
const INPUT_FILENAME = 'input.txt';

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
    return data.toString().trim().split(/(?:\r?\n)/);
}

/**
 * Parse id.
 * @param {String} item
 * @return {Number} Return an id.
 */
function parseId(item) {
    const value = item.replace(/F|L/g, '0').replace(/B|R/g, '1');
    return parseInt(value, 2);
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    const ids = items.map(parseId);
    console.log('Total ids:', ids.length)
    console.log('');

    console.log('Part 1...');
    ids.sort((a, b) => (a - b));
    let min = ids[0];
    let max = ids[ids.length - 1];
    console.log('Min id:', min);
    console.log('Max id:', max);
    console.log('');

    console.log('Part 2...');
    for (let i = min; i < max; i++) {
        if (!ids.includes(i)) {
            console.log("Found:", i);
        }
    }
    console.log('');
}

main();
