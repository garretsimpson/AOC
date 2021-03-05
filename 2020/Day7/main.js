/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 7';
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
    return data.toString().trim().split(EOL);
}

/**
 * Parse id.
 * @param {String} item
 * @return {Object} Return a record object.
 */
function parseRecord(item) {
    const RE = /(?<name>.??)bag(?:s?)/;
    let a;
    while ((a = RE.exec(item)) != null) {
        if (a.groups == undefined) {
            log.error("Cannot parse record:", item);
        }
        console.log('Name:', a.groups.name);
    }
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    const records = items.map(parseRecord);
    console.log('');

    console.log('Part 1...');
    console.log('');
}

main();
