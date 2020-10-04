import buildTree from './src/buildtree.js';
import parseFile from './src/parsers.js';
import renderFormat from './src/formatters.js';

const gendiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const file1 = parseFile(pathToFile1);
  const file2 = parseFile(pathToFile2);
  const tree = buildTree(file1, file2);
  const resultPrint = renderFormat(format, tree);
  return resultPrint;
};

export default gendiff;
