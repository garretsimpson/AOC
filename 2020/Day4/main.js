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
 * Parse items.
 * @param {String} data
 * @return {Array<String>} An Array of items.
 */
function parseItems(data) {
    console.log('Parsing...');
    return data.toString().trim().split(/(?:\r?\n){2}/);
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    const numItems = items.length;
    console.log('Number of items:', numItems);
    console.log('Last item:', items[numItems - 1]);
    console.log('');

    console.log('Part 1...');
    // TODO: Use Array map/reduce

    // Parse records
    let records = [];
    const RE = /(?<key>\w{3}):(?<value>.+?)(?: |$)/mg;
    for (const item of items) {
        let a = [];
        let o = {};
        while ((a = RE.exec(item)) != null) {
            if (a.groups == undefined) {
                console.error('Unable to parse item:', item)
                exit();
            }
            o[a.groups.key] = a.groups.value;
        }
        records.push(o);
    }
    console.log('Total records:', records.length)

    // Verify records
    const REQ_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let numValid = 0;
    for (const record of records) {
        let valid = true;
        for (const field of REQ_FIELDS) {
            if (record[field] == undefined) {
                valid = false;
                break;
            }
        }
        if (valid) {
            numValid++;
        }
    }
    console.log('Valid Records:', numValid);
}

main();
