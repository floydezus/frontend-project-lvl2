import * as fs from 'fs';
import * as path from 'path';
import buildTree from './src/treebuilder.js';
import parse from './src/parsers.js';
import formatter from './src/formatters.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFormat = (extname) => extname.slice(1);

const gendiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const data1 = readFile(pathToFile1);
  const data2 = readFile(pathToFile2);
  const format1 = getFormat(path.extname(pathToFile1));
  const format2 = getFormat(path.extname(pathToFile2));
  const parsedData1 = parse(data1, format1);
  const parsedData2 = parse(data2, format2);
  const tree = buildTree(parsedData1, parsedData2);
  return formatter(tree, format);
};

export default gendiff;
