/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 13';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;
const SEP = ',';

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

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    let ts, schedule;
    [ts, schedule] = input.trim().split(EOL);
    ts = parseInt(ts);
    console.log('');

    console.log('Part 1...');
    let values = schedule.split(SEP).map(v => parseInt(v)).filter(v => Number.isInteger(v));
    console.log('Total values:', values.length);
    let wait = values.map(v => v - (ts % v));
    let min = Math.min(...wait);
    let num1 = values[wait.indexOf(min)] * min;
    console.log('Result:', num1);
    console.log('');

    console.log('Part 2...');
    values = schedule.split(SEP).map(v => parseInt(v));
    // values = [17,NaN,13,19];
    // values = [67,7,59,61];
    // values = [67,NaN,7,59,61];
    console.log('Total values:', values.length);
    const START_TS = 100000000000000;
    const inc = values[0];
    ts = Math.floor(START_TS / inc) * inc;
    while(true) {
        if (ts % 1000000 == 0)
            console.log('ts:', ts);
        let a = Object.keys(values).map(key => {
            let i = parseInt(key);
            let v = values[i];
            return (!Number.isInteger(v)) || ((ts + i) % v == 0);
        });
        if (!a.includes(false))
            break;
        ts += inc;
    }
    console.log('Result:', ts);
    console.log('');
}

main();

// while(!found) {
//     ts++;
//     for (let i = 0; i < schedule.length; i++) {
//         let num = parseInt(schedule[i]);
//         if (!Number.isInteger(num))
//             continue;
//         if (ts % num != 0)
//             break;
//         found = true;
//     }
// }

/*

Attempting to find calculation...

- Problem: Given an array of numbers (a[i]), find smallest number (t) that for all i, (t + i) % a[i] = 0, or t % a[i] = a[i] - i;
- Given: 17,x,13,19 -> t is 3417.

- Try brute force...

- Try brute force with skipping (use largest factor)...

- Try math...
- Start at t = 1000.
- First possible ts is 1000 + (17 - (1000 % 17)) = 1003.
- Possible solutions are...
- (17 * x) + 1003 = t  (1003, 1020, 1037, ...)
- Other possible solutions are ...
- (13 * y) + 1012 = t  (1012, 1025, 1038, ...)
- (19 * z) + 1004 = t  (1004, 1023, 1042, ...)

- Try multiple equations...

17x - 0 = t
13y - 2 = t
19z - 3 = t

17x + 13y + 19z = 3t + 5

13y - 2 = 17x
y = (17/13)x + 2/13

19z - 3 = 17x
z = (17/19)x + 3/19

17x + 17x + 2 + 17x + 3 = 3t + 5
17x = t // That didn't help.

x = 201
y = 263
z = 180
t = 3417

- Try something about prime factors.  remainder sets?

input = '23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,37,x,x,x,x,x,421,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,19,x,x,x,x,x,x,x,x,x,29,x,487,x,x,x,x,x,x,x,x,x,x,x,x,13'
start = 100000000000000
max   = 871100667227947


*/