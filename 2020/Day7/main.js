/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 7';
const INPUT_FILENAME = 'input.txt';
const EOL = /\n/;
const BLANK_LINE = /\n{2}/;

const RECORDS = {};

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
 * Parse record.
 * @param {String} item
 * @return {Object} Return a record object.
 */
function parseRecord(item) {
    const RE1 = /^(?<name>.+) bags contain/g;
    let a = RE1.exec(item);
    if (a.groups == undefined) {
        log.error("Cannot parse record:", item);
        exit();
    }
    const name = a.groups.name;
    console.log('Name:', name);
    let obj = { 'name': name, 'has': [] };

    const RE2 = /(?<num>\d+) (?<value>.+?) bag/g;
    RE2.lastIndex = RE1.lastIndex;
    while ((a = RE2.exec(item)) != null) {
        if (a.groups == undefined) {
            log.error("Cannot parse record:", item);
            exit();
        }
        let num = a.groups.num;
        let value = a.groups.value;
        console.log('  has:', num, value);
        obj.has.push({ 'num': parseInt(num), 'value': value });
    }
    return obj;
}

/**
 * Perform a deep search of the object for the given value.
 * @param {Object} obj
 * @param {String} value
 * @return {Boolean} Return true if value is found in the object. Otherwise return false.
 */
function findValue(obj, value) {
    if (obj.has.length == 0) {
        return false;
    }
    const values = obj.has.map(o => o.value);
    return values.includes(value)
        || values.map(v => findValue(RECORDS[v], value)).some(x => x);
}

/**
 * Perform a deep count of the items contained in the given object.
 * @param {Object} obj
 * @return {Number} Return total number of items.
 */
function countItems(obj) {
    if (obj.has.length == 0) {
        return 0;
    }
    const nums = obj.has.map(o => o.num + o.num * countItems(RECORDS[o.value]));
    return nums.reduce((a, v) => a + v);
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    for (item of items) {
        const rec = parseRecord(item);
        RECORDS[rec.name] = rec;
    }
    console.log('Total records:', Object.keys(RECORDS).length);
    console.log('');

    const MY_BAG = 'shiny gold';

    console.log('Part 1...');
    const num1 = Object.values(RECORDS).map(obj => findValue(obj, MY_BAG)).filter(x => x).length;
    console.log('Number:', num1);
    console.log('');

    console.log('Part 2...');
    const num2 = countItems(RECORDS[MY_BAG]);
    console.log('Number:', num2);
    console.log('');
}

main();
