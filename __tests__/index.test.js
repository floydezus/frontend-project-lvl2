import * as path from 'path';
import * as fs from 'fs';
// const gendiff = require('../index.js');
// const path = require('path');
// const fs = require('fs');
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
// import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const res1 = readFile('before_after.txt').trim();
const res2 = readFile('file1_file2_plain.txt');

test('plain', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(res2);
});

test.each([
  [getFixturePath('before.json'), getFixturePath('after.json'), res1],
  [getFixturePath('before.yaml'), getFixturePath('after.yaml'), res1],
  [getFixturePath('before.ini'), getFixturePath('after.ini'), res1],
  [,, 'Empty arguments'],
  [getFixturePath('before.json'), , 'Empty arguments'],
  [getFixturePath('before.json'), 'afterrrr', 'Not files'],

])('gendiff(%j, %j)', (a, b, expected) => {
  expect(gendiff(a, b)).toBe(expected);
});
