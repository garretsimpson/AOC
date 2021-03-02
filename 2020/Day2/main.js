/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const INPUT_FILENAME = 'input.txt';

function main() {
    console.log('Advent of Code 2020 - Day 2');
    console.log(Date());
    console.log('');

    // Read input file
    console.log('Read input file:', INPUT_FILENAME);
    let input;
    try {
        input = readFileSync(INPUT_FILENAME, 'utf8')
    } catch (err) {
        console.error(err)
        exit();
    }

    // Parse input file
    console.log('Parsing...');
    let data = input.toString().split(/\r?\n/);
    console.log('  length:', data.length);
    console.log('');

    console.log('Part 1...');
    let valid = 0;
    let invalid = 0;
    const RE1 = /^(?<min>\d+)-(?<max>\d+) (?<chr>\w): (?<str>\w+)$/;
    let line = "";
    for (let i = 0; i < data.length; i++) {
        line = data[i].toString();
        const parse = line.match(RE1);
        if (parse == null) {
            console.log("Failed to parse line:", line);
            continue;
        }
        const re2 = new RegExp(parse.groups.chr, 'g');
        const found = parse.groups.str.match(re2);
        if (found == null
            || found.length < parse.groups.min || found.length > parse.groups.max) {
            invalid++;
            console.log(line, 'INVALID');
        }
        else {
            valid++;
            console.log(line, 'VALID');
        }
    }

    console.log('');
    console.log('Results:');
    console.log('  Valid:', valid);
    console.log('  Invalid:', invalid);
    console.log('');

}

main();
