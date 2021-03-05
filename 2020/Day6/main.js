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
    return data.toString().trim().split(/(?:\r?\n){2}/);
}


/**
 * Parse record.
 * @param {String} item
 * @return {Object} A record object.
 */
function parseRecord(item) {
    const RE = /\w/mg;
    const a = item.match(RE);
    if (a == null) {
        console.error('Unable to parse item:', item)
        exit();
    }
    let o = {};
    for (const key of a) {
        o[key] = 1;
    }
    return o;
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    const records = items.map(parseRecord);
    console.log('Total records:', records.length);
    console.log('');

    console.log('Part 1...');
    const total = records.map(r => Object.keys(r).length).reduce((a, v) => a + v);
    console.log('Total:', total);
    console.log('');
}

main();
