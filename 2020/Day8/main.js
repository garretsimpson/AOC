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
 * Parse instruction.
 * @param {String} item
 * @return {Object} An instruction object.
 */
function parseInstruction(item) {
    const RE = /^(?<op>\w{3}) (?<arg>\+\d+|\-\d+)/;
    const a = RE.exec(item);
    if (a == null || a.groups == undefined) {
        console.log('Unable to parse item:', item);
        exit();
    }
    const op = a.groups.op;
    const arg = parseInt(a.groups.arg);
    return { 'op': op, 'arg': arg };
}

/**
 * Run the program until the program counter goes out of bounds or a loop is detected.
 * 
 * Returns a object containing the current state and flags: acc, pc, loop, oob
 * 
 * @param {Array<Object>} prog The program.
 * @param {Number} lineNum [optional] If passed, alter the code at this line number.
 * @return {Object} State object.
 */
function runProg(prog, lineNum) {
    const state = {
        acc: 0,       // accumulator
        pc: 0,        // program counter
        loop: false,  // loop detected
        oob: false    // out-of-bounds
    }
    let running = true;
    const seen = new Set();

    if (lineNum != undefined) {
        if (lineNum < 0 || lineNum >= prog.length) {
            console.error('Invalid line number:', lineNum);
            exit();
        }
        console.log('Running alternate #%d', lineNum);
        if (prog[lineNum].op == 'acc') {
            console.log('No change - skipping.');
            return null;
        }
    }

    while (running) {
        if (state.pc == prog.length) {
            console.log('====> Program exits normally. <====');
            return state;
        }
        if (state.pc < 0 || state.pc > prog.length) {
            console.log('Program out-of-bounds.');
            state.oob = true;
            return state;
        }
        if (seen.has(state.pc)) {
            console.log('Program loop detected.');
            state.loop = true;
            return state;
        }
        seen.add(state.pc);

        const inst = prog[state.pc];
        op = inst.op;
        if (state.pc == lineNum) {
            // Alternate code - change the operation
            if (op == 'jmp') op = 'nop';
            else if (op == 'nop') op = 'jmp';
        }
        // console.log(state.pc, inst.op, inst.arg);
        switch (op) {
            case 'acc':
                state.acc += inst.arg;
                break;
            case 'jmp':
                state.pc += inst.arg;
                continue;
            case 'nop':
                break;
            default:
                console.error('Unknown program instruction:', inst.op);
                exit();
        }
        state.pc++;
    }
}

/**
 * Run a series of alternate programs.
 * @param {Array<Object>} prog The original program.
 * @return {Object} State object.
 */
function alterProg(prog) {
    let state = {};
    for (let i = 0; i < prog.length; i++) {
        state = runProg(prog, i);
    }
    return state;
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    const prog = items.map(parseInstruction);
    console.log('Program length:', prog.length);
    console.log('');

    console.log('Part 1...');
    const state1 = runProg(prog);
    console.log("Value:", state1.acc);
    console.log('');

    console.log('Part 2...');
    const state2 = alterProg(prog);
    console.log("Value:", state2.acc);
    console.log('');
}

main();
