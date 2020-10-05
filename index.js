import * as fs from 'fs';
import * as path from 'path';
import buildTree from './src/buildtree.js';
import parse from './src/parsers.js';
import render from './src/formatters.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const gendiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  // чтение файлов
  const data1 = readFile(pathToFile1);
  const data2 = readFile(pathToFile2);
  // парсинг
  const parcedData1 = parse(data1, path.extname(pathToFile1));
  const parcedData2 = parse(data2, path.extname(pathToFile2));
  // построение дерева различий
  const tree = buildTree(parcedData1, parcedData2);
  // получение результата в нужном виде
  const resultString = render(format, tree);
  return resultString;
};

export default gendiff;
