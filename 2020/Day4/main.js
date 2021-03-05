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
    const RE = /(?<name>\w{3}):(?<value>.+?)(?: |$)/mg;
    let a = [];
    let o = {};
    while ((a = RE.exec(item)) != null) {
        if (a.groups == undefined) {
            console.error('Unable to parse item:', item)
            exit();
        }
        o[a.groups.name] = a.groups.value;
    }
    return o;
}

const REQ_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

/**
 * Verify record - Part 1.
 * @param {Object} record
 * @return {Boolean} Return true if record is valid. Otherwise return false.
 */
function verifyRecordPart1(record) {
    const values = REQ_FIELDS.map(name => record[name]);
    return values.every(value => value != undefined);
}

/**
 * Verify year.
 * @param {String} value
 * @param {Number} min
 * @param {Number} max
 * @return {Boolean} Return true if value is at least min and at most max. Otherwise return false.
 */
function verifyYear(value, min, max) {
    const RE = /^(?<num>\d{4})$/;
    const a = RE.exec(value);
    if (a == null) {
        return false;
    }
    const n = parseInt(a[0], 10);
    return (n >= min) && (n <= max);
}

/**
 * Verify height.
 * @param {String} value
 * @return {Boolean} Return true if value is a valid height. Otherwise return false.
 */
function verifyHeight(value) {
    const RE = /^(?<num>\d+)(?<unit>cm|in)$/;
    const a = RE.exec(value);
    if (a == null) {
        return false;
    }
    const num = parseInt(a.groups.num, 10);
    switch (a.groups.unit) {
        case 'cm':
            return (num >= 150) && (num <= 193);
        case 'in':
            return (num >= 59) && (num <= 76);
    }
}

/**
 * Verify color.
 * @param {String} value
 * @return {Boolean} Return true if value is a valid color. Otherwise return false.
 */
function verifyColor(value) {
    const RE = /^#[0-9a-f]{6}$/;
    return RE.test(value);
}

const VALID_EYE_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
/**
 * Verify emumerated type.
 * @param {String} value
 * @param {Array<String>} validValues
 * @return {Boolean} Return true if value is one of a list of valid values. Otherwise return false.
 */
function verifyEnum(value, validValues) {
    const RE = new RegExp('^' + VALID_EYE_COLORS.join('|') + '$');
    return RE.test(value);
}

/**
 * Verify number.
 * @param {String} value
 * @param {Number} length
 * @return {Boolean} Return true if value is a valid number of specified length. Otherwise return false.
 */
function verifyNumber(value, length) {
    const RE = new RegExp('^\\d{' + length + '}$');
    return RE.test(value);
}

/**
 * Verify record - Part 2.
 * @param {Object} record
 * @return {Boolean} Return true if record is valid. Otherwise return false.
 */
function verifyRecordPart2(record) {
    let valid = true;
    for (const name of REQ_FIELDS) {
        const value = record[name];
        if (value == undefined) {
            return false;
        }
        switch (name) {
            case 'byr':
                valid = verifyYear(value, 1920, 2002);
                break;
            case 'iyr':
                valid = verifyYear(value, 2010, 2020);
                break;
            case 'eyr':
                valid = verifyYear(value, 2020, 2030);
                break;
            case 'hgt':
                valid = verifyHeight(value);
                break;
            case 'hcl':
                valid = verifyColor(value);
                break;
            case 'ecl':
                valid = verifyEnum(value, VALID_EYE_COLORS);
                break;
            case 'pid':
                valid = verifyNumber(value, 9);
                break;
        }
        if (!valid) {
            console.log('Invalid field:', name, value);
            break;
        }
    }
    return valid;
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
    let numValid = records.map(verifyRecordPart1).filter(x => x).length;
    console.log('Valid records:', numValid);
    console.log('');

    console.log('Part 2...');
    numValid = records.map(verifyRecordPart2).filter(x => x).length;
    console.log('Valid records:', numValid);
}

main();
