/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 8';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;

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
 * Run the program.  Break when a loop is detected.
 * @param {Array<String>} lines
 * @return {Number} Return the value in the accumultor just before the loop is executed again.
 */
function runProg(lines) {
    console.log('Total lines:', lines.length);
    let acc = 0;  // accumulator
    let pc = 0;  // program counter
    let running = true;
    const seen = new Set();
    const RE = /^(?<op>\w{3}) (?<arg>\+\d+|\-\d+)/

    while(running) {
        const line = lines[pc];
        const a = RE.exec(line);
        if (a == null || a.groups == undefined) {
            console.log('Unable to parse line:', line);
            exit();
        }
        const op = a.groups.op;
        const num = parseInt(a.groups.arg);
        console.log(pc, op, num);

        if (seen.has(pc)) {
            return acc;
        }
        seen.add(pc);

        switch(op) {
            case 'acc':
                acc += num;
                break;
            case 'jmp':
                pc += num;
                continue;
        }
        pc++;
    }
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    console.log('');

    console.log('Part 1...');
    const num = runProg(items);
    console.log("Value:", num);
    console.log('');
}

main();
