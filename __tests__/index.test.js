import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedStylish = 0;
let expectedPlain;

beforeAll(() => {
  // stylish
  expectedStylish = readFile('expected.stylish').trim();
  // plain
  expectedPlain = readFile('expected.plain');
  // json
});

test('plain', () => {
  const currentPlain = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(currentPlain).toEqual(expectedPlain);
});

test('json_stylish', () => {
  const currentStylish = gendiff(getFixturePath('before.json'), getFixturePath('after.json'), 'stylish');
  expect(currentStylish).toEqual(expectedStylish);
});

test('yml_stylish', () => {
  const currentStylish = gendiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'), 'stylish');
  expect(currentStylish).toEqual(expectedStylish);
});

test('ini_stylish', () => {
  const currentStylish = gendiff(getFixturePath('before.ini'), getFixturePath('after.ini'), 'stylish');
  expect(currentStylish).toEqual(expectedStylish);
});

test.each([
  // [getFixturePath('before.json'), getFixturePath('after.json'), expectedStylish],
  // [getFixturePath('before.yaml'), getFixturePath('after.yaml'), expectedStylish],
  // [getFixturePath('before.ini'), getFixturePath('after.ini'), expectedStylish],
  [null, null, 'Empty arguments'],
  [getFixturePath('before.json'), null, 'Empty arguments'],
  [getFixturePath('before.json'), 'afterrrr', 'Not files'],

])('gendiff(%j, %j)', (a, b, expected) => {
  expect(gendiff(a, b)).toBe(expected);
});
