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
const expectedPlain = readFile('expected_flat.plain').trim();
const expectedJson = readFile('expected.json');

/* beforeAll(() => {
  // stylish
  expectedStylish = readFile('expected.stylish').trim();
  // plain
  expectedPlain = readFile('expected.plain');
  // json
  expectedJson = readFile('expected.json');
}); */

const cases = [['json', 'stylish', expectedStylish],
  ['yaml', 'stylish', expectedStylish],
  ['ini', 'stylish', expectedStylish],
  ['json', 'plain', expectedPlain],
  ['yaml', 'plain', expectedPlain],
  // ['ini', 'plain', expectedPlain],
  ['yaml', 'json', expectedJson],
  ['json', 'json', expectedJson],
  ['yaml', 'json', expectedJson]];

describe('gendiff flat files', () => {
  test.each(cases)(
    'first file and second file %p as format, formatter %p',
    (format, formatterName, expectedResult) => {
      const result = gendiff(getFixturePath(`file_plain_1.${format}`), getFixturePath(`file_plain_2.${format}`), formatterName);
      expect(result).toEqual(expectedResult);
    },
  );
  test('empty argument for formatter', () => {
    const caseNoArgJson = gendiff(getFixturePath('file_plain_1.json'), getFixturePath('file_plain_2.json'));
    expect(caseNoArgJson).toEqual(expectedStylish);
    const caseNoArgYaml = gendiff(getFixturePath('file_plain_1.yaml'), getFixturePath('file_plain_2.yaml'));
    expect(caseNoArgYaml).toEqual(expectedStylish);
    const caseNoArgIni = gendiff(getFixturePath('file_plain_1.ini'), getFixturePath('file_plain_2.ini'));
    expect(caseNoArgIni).toEqual(expectedStylish);
  });
});
