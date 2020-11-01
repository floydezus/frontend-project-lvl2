import _ from 'lodash';

const prefixes = {
  deleted: '-',
  added: '+',
  unchanged: ' ',
  nested: ' ',
};

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }

    const indentSize = depth * spacesCount;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const indentSizeInner = (key.includes(' ')) ? depth * spacesCount - 2 : depth * spacesCount;
        const currentIndent = replacer.repeat(indentSizeInner);
        return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const processKey = (node) => `${prefixes[node.type]} ${node.name}`;
const formatStylish = (diffTree) => {
  const reducer = (acc, node) => {
    switch (node.type) {
      case 'added':
        return { ...acc, [processKey(node)]: node.value2 };
      case 'deleted':
        return { ...acc, [processKey(node)]: node.value1 };
      case 'unchanged':
        return { ...acc, [processKey(node)]: node.value1 };
      case 'changed':
        return { ...acc, [`${prefixes.deleted} ${node.name}`]: node.value1, [`${prefixes.added} ${node.name}`]: node.value2 };
      case 'nested':
        return { ...acc, [processKey(node)]: node.children.reduce(reducer, {}) };
      default:
        throw new Error(`Unknown type of node: '${node.type}'!`);
    }
  };
  const treeObj = diffTree.reduce(reducer, {});
  return stringify(treeObj, ' ', 4);
};

export default formatStylish;
