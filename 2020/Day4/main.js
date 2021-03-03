/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 4';
const INPUT_FILENAME = 'input.txt';

/**
 * Read input file.
 * @param {String} filename
 * @return {String} file contents
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
 * Parse records.
 * @param {String} data
 * @return {Array<String>} An Array of records.
 */
function parseRecords(data) {
    console.log('Parsing...');
    return data.toString().split(/\r?\n/);
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const records = parseRecords(input);
    console.log('Number of records:', records.length);
    console.log('Sample record:', records[0]);
    console.log('');

    console.log('Part 1...');
    console.log('');
}

main();
