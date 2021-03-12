/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 14';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;

let MEM;

/**
 * Read input file.
 * @param {String} filename
 * @return {String} Return entire contents of the file.
 */
function readFile(filename) {
    const { readFileSync } = require('fs');
    console.log('Read input file:', INPUT_FILENAME);
    return readFileSync(INPUT_FILENAME, 'utf8')
}

/**
 * Parse items.
 * @param {String} data
 * @return {Array<Array<String>>} An array of items.
 */
 function parseItems(data) {
    console.log('Parsing...');
    return data.toString().trim().split(EOL);
}

/**
 * Parse lines.
 * @param {Array<String>} items Array of items.
 * @return {Array<Object>} An array of line objects.
 */
 function parseLines(items) {
    const RE_MASK = /^mask = (?<mask>[01X]+)/;
    const RE_MEM = /^mem\[(?<index>\d+)\] = (?<value>\d+)/;
    let result = [];
    let mask = '';
    for (item of items) {
        let a;
        if ((a = item.match(RE_MASK)) != null) {
            mask = a[1];
        }
        else if ((a = item.match(RE_MEM)) != null) {
            let index = parseInt(a[1]);
            let value = parseInt(a[2]);
            result.push({mask: mask, index: index, value: value});
        }
        else {
            console.error('Unable to parse line:', item);
            return false;
        }
    }
    return result;
}

/**
 * Run the program
 * @param {Array<Object>} lines
 */
function runProg(lines) {
    for (line of lines) {
        const ONE = BigInt('0b' + line.mask.replace(/X/g, '0'));
        const ZERO = BigInt('0b' + line.mask.replace(/X/g, '1'));
        const value = BigInt(line.value);
        MEM[line.index] = (value & ZERO) | ONE;
    }
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    const lines = parseLines(items);
    console.log('Total lines:', lines.length);
    console.log('');

    console.log('Part 1...');
    MEM = [];
    runProg(lines);
    let sum = 0n;
    MEM.forEach(val => sum += val);
    console.log('Result:', sum);
    console.log('');
}

main();

/*

value:  000000000000000000000000000000001011  (decimal 11)
mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
result: 000000000000000000000000000001001001  (decimal 73)

value:  00001011
mask:   X1XXXX0X
zero:   11111101
one:    01000000
v0:     00001001  // value & ZERO
result: 01001001  // v0 | ONE

*/