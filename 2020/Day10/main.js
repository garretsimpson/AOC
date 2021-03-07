/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const { readFileSync } = require('fs');
const { exit } = require('process');

const TITLE = 'Advent of Code 2020 - Day 10';
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

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    console.log('Total items:', items.length);
    let NUMBERS = items.map(x => parseInt(x));
    NUMBERS.sort((a, b) => a - b);
    console.log('');

    console.log('Part 1...');
    // Insert source (0) and target (last + 3) values
    NUMBERS = [0, ...NUMBERS, NUMBERS[NUMBERS.length - 1] + 3];
    console.log('Numbers:', NUMBERS.join(' '));
    const deltas = NUMBERS.map((v, i, a) => a[i + 1] - a[i]);
    // Last delta value is NaN
    deltas.pop();
    console.log('Deltas:', deltas.join(' '));
    // Count delta=1 and delta=3
    const d1 = deltas.filter(v => v == 1).length;
    const d3 = deltas.filter(v => v == 3).length;
    console.log("Result:", d1, d3, d1 * d3);
    console.log('');

    console.log("Part 2...");
    let lengths = [];
    let seq = [NUMBERS[0]];
    for (let i = 1; i < NUMBERS.length; i++) {
        if (deltas[i - 1] != 1) {
            if (seq.length > 1) {
                lengths.push(seq.length - 2);
                console.log(seq.join(' '));
            }
            seq = [];
        }
        seq.push(NUMBERS[i]);
    }
    console.log('Lengths:', lengths.join(' '));
    // Only need four factors as the maximum sequence length is three.
    const FACTORS = [1, 2, 4, 7];
    let result = lengths.map(v => FACTORS[v]).reduce((a, v) => a * v);
    console.log('Result:', result);

    console.log('');
}

main();

/*

Attempting to find combination calculation.

- Sample sequence
(0), 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31, 32, 33, 34, 35, 38, 39, 42, 45, 46, 47, 48, 49, (52)
- Find the delta 1 sequences...
0, 1, 2, 3, 4
7, 8, 9, 10, 11
17, 18, 19, 20
23, 24, 25
31, 32, 33, 34, 35
38, 39
45, 46, 47, 48, 49
- Compute their lengths minus two (the first and last value are fixed)
3, 3, 2, 1, 3, 0, 3
- Compute combinations...
- Can only remove at most two in seq.
- For length n:
  - remove 0 - 1    ""
  - remove 1 - n-0  "X"
  - remove 2
    - 0 space - n-1 "XX"
    - 1 space - n-2 "X0X"
  - remove 3
    - 0 space - n-2 "XXX"
- 0 -> 1
- 1 -> 1 + (n-0) = 2
- 2 -> 1 + (n-0) + (n-1) = 4
- 3 -> 1 + (n-0) + (n-1 + n-2) = 7
- Stop here: The longest sequence to remove in the data is three.
- Multiply
7*7*4*2*7*1*7 = 19208

*/