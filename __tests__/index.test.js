import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expected.stylish').trim();
const expectedPlain = readFile('expected.plain').trim();
const expectedJson = readFile('expected.json');

const cases = [['json', 'stylish', expectedStylish],
  ['yaml', 'stylish', expectedStylish],
  ['ini', 'stylish', expectedStylish],
  ['json', undefined, expectedStylish],
  ['json', 'plain', expectedPlain],
  ['yaml', 'plain', expectedPlain],
  ['ini', 'plain', expectedPlain],
  ['yaml', 'json', expectedJson],
  ['json', 'json', expectedJson],
  ['ini', 'json', expectedJson]];

describe('compares two configuration files', () => {
  test.each(cases)(
    'file1 and file2 %p as format, formatter %p',
    (format, formatterName, expectedResult) => {
      const result = gendiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), formatterName);
      expect(result).toEqual(expectedResult);
    },
  );
});
