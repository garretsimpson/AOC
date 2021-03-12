/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 15';

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = '0,1,4,13,15,12,16';
    console.log('Input:', input);
    const items = input.split(/,/);
    const values = items.map(item => parseInt(item));
    console.log('');

    console.log('Part 1...');
    log = [];
    values.forEach(val => log.unshift(val));
    while (log.length < 2020) {
        let pos = log.indexOf(log[0], 1);  // previously seen position
        let val = (pos == -1) ? 0 : pos;
        log.unshift(val);
    }
    console.log('Result:', log[0]);
    console.log('');

    console.log('Part 2...');
    while (log.length < 30000000) {
        if (log.length % 100000 == 0)
            console.log(log.length);
        let pos = log.indexOf(log[0], 1);  // previously seen position
        let val = (pos == -1) ? 0 : pos;
        log.unshift(val);
    }
    console.log('Result:', log[0]);
    console.log('');
}

main();
