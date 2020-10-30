import _ from 'lodash';

const prefixes = {
  deleted: '-',
  added: '+',
  unchanged: '*',
  nested: '>',
};

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

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
  const treeObj = diffTree.reduce((acc, node) => {
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
        return { ...acc, [processKey(node)]: formatStylish(node.children) };
      default:
        throw new Error(`Unknown type of node: '${node.type}'!`);
    }
  }, {});
  return stringify(treeObj, '  ', 1);
};

export default formatStylish;
