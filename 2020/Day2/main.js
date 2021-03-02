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
    let data = input.toString().split("\n");
    console.log('  length:', data.length);
    console.log('');

    console.log('Part 1...');

    line = data[0].toString();
    console.log('Sample:', line);
    const re1 = /^(?<min>\d+)-(?<max>\d+) (?<chr>\w): (?<str>\w+)$/;
    const found = line.match(re1);
    console.log('Found:', found, found.groups);
    const re2 = found.groups.chr;
    console.log(re2);

    console.log('');

}

main();
