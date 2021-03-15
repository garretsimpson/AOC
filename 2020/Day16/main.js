/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 16';
const INPUT_FILENAME = 'input.txt';

const BLANK = /(?:\r?\n){2}/;
const EOL = /\r?\n/;

/**
 * Read input file.
 * @param {String} filename
 * @return {String} Return entire contents of the file.
 */
function readFile(filename) {
    const { readFileSync } = require('fs');
    console.log('Read input file:', INPUT_FILENAME);
    return readFileSync(INPUT_FILENAME, 'utf8').toString();
}

/**
 * Parse items.
 * @param {String} data
 * @return {Array<Array<String>>} An array of items.
 */
 function parseItems(data) {
    console.log('Parsing...');
    return data.toString().trim().split(BLANK);
}

/**
 * Parse Field.
 * Sample: departure location: 25-568 or 594-957
 * Returns: {name: [[x,x],[x,x]]}
 * @param: {String} item
 * @return {Object} A field record.
 */
function parseField(item) {
    const RE = /^(?<name>.+): (?<r1>.+) or (?<r2>.+)$/;
    const a = item.match(RE);
    if (a == null) {
        console.error('Unable to parse field:', item)
        return null;
    }
    let result = [];
    for (range of [a.groups.r1, a.groups.r2]) {
        result.push(range.match(/\d+/g).map(v => parseInt(v)));
    }
    return {name: a.groups.name, values: result};
}

/**
 * Parse ticket.
 * @param: {String} item
 * @return {Array} A ticket record.
 */
 function parseTicket(item) {
    const SEP = /,/;
    return item.split(SEP).map(v => parseInt(v));
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    const fields = items[0].split(EOL).map(parseField);
    console.log('Total fields:', fields.length);
    const tickets = items[2].split(EOL).slice(1).map(parseTicket);
    console.log('Total tickets:', tickets.length);
    console.log('');

    console.log('Part 1...');
    const RANGE = new Set();
    for (let field of fields) {
        for (let value of field.values) {
            for (let i = value[0]; i <= value[1]; i++) {
                RANGE.add(i);
            }
        }
    }
    let result1 = 0;
    for (ticket of tickets) {
        for (let value of ticket) {
            if (!RANGE.has(value)) {
                result1 += value;
            }
        }
    }
    console.log('Result:', result1);
    console.log('');
}

main();
