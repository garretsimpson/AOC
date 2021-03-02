/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const INPUT_FILENAME = 'input.txt';
const TARGET = 2020;

function main() {
    console.log('Advent of Code 2020 - Day 1');
    console.log(Date());
    console.log('');

    // Read input file
    console.log('Read input file:', INPUT_FILENAME);
    let input;
    try {
        input = readFileSync(INPUT_FILENAME, 'utf8')
        // console.log(input)
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
    // Iterate over data to find target value
    let found = false;
    let x = 0, y = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            x = Number(data[i]);
            y = Number(data[j]);
            if (x + y == TARGET) {
                found = true;
                console.log("Result:", x, y, x + y, x * y);
            }
        }
    }
    if (!found) {
        console.log("Not found!");
    }
    console.log('');

    console.log('Part 2...');
    // Iterate over data to find target value
    found = false;
    x = 0, y = 0, z = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            for (let k = j + 1; k < data.length; k++) {
                x = Number(data[i]);
                y = Number(data[j]);
                z = Number(data[k]);
                if (x + y + z == TARGET) {
                    found = true;
                    console.log("Result:", x, y, z, x + y + z, x * y * z);
                }
            }
        }
    }
    if (!found) {
        console.log("Not found!");
    }
    console.log('');

}

main();
