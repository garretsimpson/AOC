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

    const RE1 = /^(?<n1>\d+)-(?<n2>\d+) (?<chr>\w): (?<str>\w+)$/;

    console.log('Part 1...');
    // Parse lines
    let valid = 0;
    let invalid = 0;
    let line = "";
    for (let i = 0; i < data.length; i++) {
        line = data[i].toString();
        const parse = line.match(RE1);
        if (parse == null) {
            console.log("Failed to parse line:", line);
            continue;
        }

        // Verify values
        const min = parse.groups.n1;
        const max = parse.groups.n2;
        const str = parse.groups.str;
        const re2 = new RegExp(parse.groups.chr, 'g');
        const found = str.match(re2);
        if (found == null
            || found.length < min || found.length > max) {
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

    // TODO: Refactor common code
    console.log('Part 2...');
    // Parse lines
    valid = 0;
    invalid = 0;
    line = "";
    for (let i = 0; i < data.length; i++) {
        line = data[i].toString();
        const parse = line.match(RE1);
        if (parse == null) {
            console.log("Failed to parse line:", line);
            continue;
        }

        // Verify values
        const str = parse.groups.str;
        const c1 = str[parse.groups.n1 - 1];
        const c2 = str[parse.groups.n2 - 1];
        const chr = parse.groups.chr;
        let num = (c1 != chr ? 0 : 1) + (c2 != chr ? 0 : 1);
        if (num != 1) {
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
