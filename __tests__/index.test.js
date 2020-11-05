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

const inputFormats = ['json', 'ini', 'yaml'];

const outputFormats = ['stylish', 'plain', 'json', undefined];

const formatterDataMap = {
  stylish: expectedStylish,
  plain: expectedPlain,
  json: expectedJson,
  undefined: expectedStylish,
};

describe.each(inputFormats)('compares two configuration files as %s format',
  (inputFormat) => {
    const path1 = getFixturePath(`file1.${inputFormat}`);
    const path2 = getFixturePath(`file2.${inputFormat}`);
    test.each(outputFormats)(
      'Output %s format',
      (formatterName) => {
        const result = gendiff(path1, path2, formatterName);
        expect(result).toEqual(formatterDataMap[formatterName]);
      },
    );
  });
