import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedStylish;
let expectedPlain;
let expectedJson;

beforeAll(() => {
  // stylish
  expectedStylish = readFile('expected.stylish').trim();
  // plain
  expectedPlain = readFile('expected_flat.plain').trim();
  // json
  expectedJson = readFile('expected.json');
});

const cases = [
  ['json'],
  ['yaml'],
  ['ini'],
];

describe.each(cases)('first file and second file %p as format', (format) => {
  test('stylish formatter', () => {
    const actual = gendiff(getFixturePath(`file_plain_1.${format}`), getFixturePath(`file_plain_2.${format}`), 'stylish');
    const expected = expectedStylish;

    expect(actual).toEqual(expected);
  });

  test('plain formatter', () => {
    const actual = gendiff(getFixturePath(`file_plain_1.${format}`), getFixturePath(`file_plain_2.${format}`), 'plain');
    const expected = expectedPlain;

    expect(actual).toEqual(expected);
  });

  test('json formatter', () => {
    const actual = gendiff(getFixturePath(`file_plain_1.${format}`), getFixturePath(`file_plain_2.${format}`), 'json');
    const expected = expectedJson;

    expect(actual).toEqual(expected);
  });
  test('empty formatter', () => {
    const actual = gendiff(getFixturePath(`file_plain_1.${format}`), getFixturePath(`file_plain_2.${format}`));
    const expected = expectedStylish;

    expect(actual).toEqual(expected);
  });
});
