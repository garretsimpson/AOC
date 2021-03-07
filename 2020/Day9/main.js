/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 9';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;
let NUMBERS = [];

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
 * Find the first "bad" number.
 * @return {Number} Index of the number.
 */
function findBadNumber() {
    const RANGE = 25;

    for (let i = RANGE; i < NUMBERS.length; i++) {
        let num = NUMBERS[i];
        if (any2(num, i - RANGE, i) == false) {
            return i;
        }
    }
}

/**
 * Given a target number and two indexes, return true if the sum of any two numbers equals the target number.
 * @param {Number} num The target number.
 * @param {Number} min The lower index [inclusive].
 * @param {Number} max The upper index [exclusive].
 * @return {Boolean}
 */
function any2(num, min, max) {
    for (let i = min; i < max; i++) {
        for (let j = i + 1; j < max; j++) {
            // console.log(i, j, num, NUMBERS[i], NUMBERS[j]);
            if (NUMBERS[i] + NUMBERS[j] == num) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Find the range of numbers that sum to the target number.
 * @param {Number} num Target number.
 * @return {Array} Return two index values.
 */
function findRange(num) {
    for (let i = 0; i < NUMBERS.length; i++) {
        if (NUMBERS[i] > num) {
            console.error("Target number exceeded.");
            exit();
        }
        for (let j = i + 1; j < NUMBERS.length; j++) {
            let sum = NUMBERS.slice(i, j + 1).reduce((a, v) => a + v);
            if (sum == num) return [i, j];
            if (sum > num) break;
        }
    }
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    NUMBERS = items.map(x => parseInt(x));
    console.log('');

    console.log('Part 1...');
    let i = findBadNumber();
    let num = NUMBERS[i];
    console.log("Number:", i, num);
    console.log('');

    console.log('Part 2...');
    let j;
    [i, j] = findRange(num);
    let min = Math.min(...NUMBERS.slice(i, j + 1));
    let max = Math.max(...NUMBERS.slice(i, j + 1));
    console.log("Number:", i, j, min + max);
    console.log('');
}

main();
