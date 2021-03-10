/**
 * Advent of Code 2020
 * 
 * @author: Garret Simpson
 */

const TITLE = 'Advent of Code 2020 - Day 12';
const INPUT_FILENAME = 'input.txt';

const EOL = /\r?\n/;

const SHIP = { x: 0, y: 0, dir: 0 };
const WAYP = { dx: 10, dy: -1 };

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
 * Parse rule.
 * @param {String} item
 * @return {Object} rule object
 */
 function parseRule(item) {
    const RE = /(?<op>\w)(?<num>\d+)/;
    const a = RE.exec(item);
    if (a == null || a.groups == undefined) {
        log.error('Unable to parse rule:', item);
        return;
    }
    return {op: a.groups.op, num: parseInt(a.groups.num)};
}

/**
 * Run rules (Part 1).
 * @param {Array<Object>} rules
 */
function runRules1(rules) {
    for (let rule of rules) {
        let op = rule.op;
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
        const num = rule.num;
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

/**
 * Run rules (Part 2).
 * @param {Array<Object>} rules
 */
 function runRules2(rules) {
    for (let rule of rules) {
        let op = rule.op;
        let num = rule.num;
        // Convert rotate right to rotate left
        if (op == 'R') {
            op = 'L';
            num = 360 - num;
        }
        if (op == 'L') {
            let x = WAYP.dx;
            let y = WAYP.dy;
            switch (num) {
                case 90:
                    WAYP.dx = y;
                    WAYP.dy = -x;
                    break;
                case 180:
                    WAYP.dx = -x;
                    WAYP.dy = -y;
                    break;
                case 270:
                    WAYP.dx = -y;
                    WAYP.dy = x;
                    break;
            }
        }
        switch (op) {
            case 'N':
                WAYP.dy -= num;
                break;
            case 'S':
                WAYP.dy += num;
                break;
            case 'E':
                WAYP.dx += num;
                break;
            case 'W':
                WAYP.dx -= num;
                break;
            case 'F':
                SHIP.x += num * WAYP.dx;
                SHIP.y += num * WAYP.dy;
                break;
        }
    }
}

function main() {
    console.log(TITLE);
    console.log(Date());
    console.log('');

    const input = readFile(INPUT_FILENAME);
    const items = parseItems(input);
    const rules = items.map(parseRule);
    console.log('Total rules:', rules.length);
    console.log('');

    console.log('Part 1...');
    runRules1(rules);
    let d1 = Math.abs(SHIP.x) + Math.abs(SHIP.y);
    console.log('Distance:', d1);
    console.log('');

    SHIP.x = 0;
    SHIP.y = 0;

    console.log('Part 2...');
    runRules2(rules);
    let d2 = Math.abs(SHIP.x) + Math.abs(SHIP.y);
    console.log('Distance:', d2);
    console.log('');
}

main();
