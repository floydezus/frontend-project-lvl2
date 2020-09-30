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
  expectedPlain = readFile('expected.plain');
  // json
  expectedJson = readFile('expected.json');
});

test('plain', () => {
  const currentPlain = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(currentPlain).toEqual(expectedPlain);
});

test('stylish', () => {
  const jsonStylish = gendiff(getFixturePath('file_plain_1.json'), getFixturePath('file_plain_2.json'), 'stylish');
  const yamlStylish = gendiff(getFixturePath('file_plain_1.yaml'), getFixturePath('file_plain_2.yaml'), 'stylish');
  const iniStylish = gendiff(getFixturePath('file_plain_1.ini'), getFixturePath('file_plain_2.ini'), 'stylish');

  expect(jsonStylish).toEqual(expectedStylish);
  expect(yamlStylish).toEqual(expectedStylish);
  expect(iniStylish).toEqual(expectedStylish);
});

test('json', () => {
  const currentJson = gendiff(getFixturePath('file_plain_1.json'), getFixturePath('file_plain_2.json'), 'json');
  expect(currentJson).toEqual(expectedJson);
});
