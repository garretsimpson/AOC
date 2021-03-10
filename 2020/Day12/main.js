/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 12';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;

const SHIP = { x: 0, y: 0, dir: 0 };

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
 * Run rules.
 * @param {Array<String>} rules
 */
function runRules(rules) {
    RE = /(?<op>\w)(?<num>\d+)/;
    for (rule of rules) {
        console.log('Rule:', rule);
        a = RE.exec(rule);
        if (a == null || a.groups == undefined) {
            log.error('Unable to parse rule:', rule);
            return;
        }
        op = a.groups.op;
        if (op == 'F') {
            switch (SHIP.dir) {
                case 0:
                    op = 'E';
                    break;
                case 90:
                    op = 'N';
                    break;
                case 180:
                    op = 'W';
                    break;
                case 270:
                    op = 'S';
                    break;
            }
        }
        num = parseInt(a.groups.num);
        switch (op) {
            case 'N':
                SHIP.y -= num;
                break;
            case 'S':
                SHIP.y += num;
                break;
            case 'E':
                SHIP.x += num;
                break;
            case 'W':
                SHIP.x -= num;
                break;
            case 'L':
                SHIP.dir += num;
                SHIP.dir %= 360;
                break;
            case 'R':
                SHIP.dir -= num;
                if (SHIP.dir < 0)
                    SHIP.dir += 360;
                break;
        }
    }
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const rules = parseItems(input);
    console.log('Total rules:', rules.length);
    console.log('');

    console.log('Part 1...');
    runRules(rules);
    d1 = Math.abs(SHIP.x) + Math.abs(SHIP.y);
    console.log('Distance:', d1);
    console.log('');
}

main();
