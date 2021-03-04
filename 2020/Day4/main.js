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
 * @return {String} Returns entire contents of the file.
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
    const RE = /(?<key>\w{3}):(?<value>.+?)(?: |$)/mg;
    let a = [];
    let o = {};
    while ((a = RE.exec(item)) != null) {
        if (a.groups == undefined) {
            console.error('Unable to parse item:', item)
            exit();
        }
        o[a.groups.key] = a.groups.value;
    }
    return o;
}

/**
 * Verify record.
 * @param {Object} record
 * @return {Boolean} Returns true if record is valid. Otherwise returns false.
 */
function verifyRecord(record) {
    const REQ_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const values = REQ_FIELDS.map(key => record[key]);
    return values.every(value => value != undefined);
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    const records = items.map(parseRecord);
    console.log('Total records:', records.length)
    console.log('');

    console.log('Part 1...');
    const numValid = records.map(verifyRecord).filter(x => x == true).length;
    console.log('Valid records:', numValid);
}

main();
