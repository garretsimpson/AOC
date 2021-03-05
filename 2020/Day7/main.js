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
    let obj = {'name': name, 'has':[]};
    
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
        obj.has.push(value);
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
    return obj.has.includes(value) || obj.has.map(v => findValue(RECORDS[v], value)).some(x => x);
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    for (item of items) {
        let rec = parseRecord(item);
        RECORDS[rec.name] = rec;
    }
    console.log('Total records:', Object.keys(RECORDS).length);
    console.log('');

    console.log('Part 1...');
    const MY_BAG = 'shiny gold';
    const num = Object.values(RECORDS).map(obj => findValue(obj, MY_BAG)).filter(x => x).length;
    console.log('Number:', num);
    console.log('');
}

main();
