/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 13';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;
const SEP = ',';

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
    console.log('');

    console.log('Part 1...');
    let ts, schedule, wait, min;
    [ts, schedule] = input.trim().split(EOL);
    ts = parseInt(ts);
    schedule = schedule.split(SEP).map(v => parseInt(v)).filter(v => Number.isInteger(v));
    console.log('Number of values:', schedule.length);
    wait = schedule.map(v => v - (ts % v));
    min = Math.min(...wait);
    let num1 = schedule[wait.indexOf(min)] * min;
    console.log('Result:', num1);
    console.log('');
}

main();
