/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 6';
const INPUT_FILENAME = 'input.txt';
const EOL = /\r?\n/;
const BLANK_LINE = /\r?\n{2}/;

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
    return data.toString().trim().split(BLANK_LINE);
}

/**
 * Parse record.
 * @param {String} item
 * @return {Object} A record object.
 */
function parseRecord(item) {
    const rec = {};
    const num = item.split(EOL).length;
    rec.people = num;

    const RE = /\w/mg;
    const a = item.match(RE);
    if (a == null) {
        console.error('Unable to parse item:', item)
        exit();
    }
    const o = {};
    for (const key of a) {
        if (o[key] == undefined) {
            o[key] = 1;
        }
        else {
            o[key]++;
        }
    }
    rec.responses = o;
    return rec;
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
    const total1 = records.map(rec => Object.keys(rec.responses).length).reduce((a, n) => a + n);
    console.log('Total:', total1);
    console.log('');

    console.log('Part 2...');
    const total2 = records.map(rec => Object.values(rec.responses).filter(n => n == rec.people).length).reduce((a, n) => a + n);
    console.log('Total:', total2);
    console.log('');
}

main();
