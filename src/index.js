// var _ = require('lodash');
import _ from 'lodash';
import getObjFromFile from './parsers.js';
// const getObjFromFile = require('./parsers.js');

const renderResultPlain = (arrayResult) => {
  const getNodesCount = (tree, parent = '') => {
    if (tree.type !== 'nested') {
      const val1 = (typeof (tree.value1) === 'object') ? '[complex value]' : tree.value1;
      const val2 = (typeof (tree.value2) === 'object') ? '[complex value]' : tree.value2;
      if (tree.type === 'unchanged') {
        return 'unchanged';
      }
      if (tree.type === 'added') {
        tree = `Property ${parent}.${tree.name} was added with value:${val2}`;
      }
      if (tree.type === 'deleted') {
        tree = `Property ${parent}.${tree.name} was removed`;
      }
      if (tree.type === 'changed') {
        tree = `Property ${parent}.${tree.name}  was updated. From ${val1} to ${val2}`;
      }
      return tree;
    }
    const { children } = tree;
    const descendantCounts = children.map((e) => getNodesCount(e, `${parent}.${tree.name}`));

    return descendantCounts;
  };

  return _.flattenDeep(arrayResult
    .map((e) => getNodesCount(e, '')))
    .filter((value) => (value !== 'unchanged'))
    .map((e) => e.replace(' .', ' '))
    .join('\n');
};

const renderResultStylish = (arrayResult) => {
  const callback = (value) => {
    const val1 = (typeof (value.value1) === 'object') ? JSON.stringify(value.value1) : value.value1;
    const val2 = (typeof (value.value2) === 'object') ? JSON.stringify(value.value2) : value.value2;

    if (value.type === 'changed') {
      value = `- ${value.name}:${val1}\n+ ${value.name}:${val2}\n`;
    }
    if (value.type === 'unchanged') {
      value = `  ${value.name}:${val1}\n`;
    }
    if (value.type === 'deleted') {
      value = `- ${value.name}:${val1}\n`;
    }
    if (value.type === 'added') {
      value = `+ ${value.name}:${val2}\n`;
    }
    if (value.type === 'nested') {
      value = `  ${value.name}: {\n\t${renderResultStylish(value.children)}\n\t}\n`;
    }
    return value;
  };
  const stringResult = arrayResult.flatMap(callback).join('').trim();
  return stringResult;
};

const getRenderFormat = (format, tree) => {
  if (format === 'stylish') {
    return renderResultStylish(tree);
  } if (format === 'plain') {
    return renderResultPlain(tree);
  }
};

const buildTree = (data1, data2) => {
  // мержим объекты, чтобы получить единый массив ключей
  // console.log(`~~~~~`);
  // console.log(data1);
  const data1Cloned = _.cloneDeep(data1);
  // console.log(data1Cloned);
  const objectForMerge = _.merge(data1Cloned, data2);
  const arrayKeys = Object.keys(objectForMerge);

  const reduceResult = (acc, currentVal) => {
    // где-то в начале проверяем плоский ли файл
    if (_.has(data1, currentVal) && _.has(data2, currentVal)) {
      if ((typeof (data1[currentVal]) === 'object') && (typeof (data2[currentVal]) === 'object')) {
        // тяжелый случай
        acc.push({ name: currentVal, children: buildTree(data1[currentVal], data2[currentVal]), type: 'nested' });
      } else if (data1[currentVal] === data2[currentVal]) {
        // ключ не изменился
        acc.push({
          name: currentVal,
          value1: data1[currentVal],
          value2: data2[currentVal],
          type: 'unchanged',
        });
      } else {
        // ключ был, но изменился
        acc.push({
          name: currentVal,
          value1: data1[currentVal],
          value2: data2[currentVal],
          type: 'changed',
        });
      }
    } else if (_.has(data1, currentVal)) {
      // удалили ключ
      acc.push({ name: currentVal, value1: data1[currentVal], type: 'deleted' });
    } else if (_.has(data2, currentVal)) {
      // добавили ключ
      acc.push({ name: currentVal, value2: data2[currentVal], type: 'added' });
    }

    return acc;
  };
  return arrayKeys.reduce(reduceResult, []);
};

const gendiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  if ((pathToFile1 == null) || (pathToFile2 == null)) {
    console.log('Empty arguments');
    return 'Empty arguments';
  }
  const objectFromFile1 = getObjFromFile(pathToFile1);
  const objectFromFile2 = getObjFromFile(pathToFile2);

  if ((objectFromFile1 == null) || (objectFromFile2 == null)) {
    console.log('Not files');
    return 'Not files';
  }

  const tree = buildTree(objectFromFile1, objectFromFile2);
  const resultPrint = getRenderFormat(format, tree);
  return resultPrint;
};

// console.log(gendiff('/home/alexander/file11.json', '/home/alexander/file22.json', 'plain'));

export default gendiff;
// module.exports = gendiff;
