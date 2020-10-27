import _ from 'lodash';

const replacer = '  ';
const stringify = (value, outDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const deepIndentSize = depth + 1;
    const deepIndent = replacer.repeat(deepIndentSize);
    const currentIndent = replacer.repeat(depth);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${deepIndent}${key}: ${iter(val, deepIndentSize)}`);

    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };

  return iter(value, outDepth);
};
const formatStylish = (diffTree) => {
  const iter = (currentValue, depth) => currentValue.flatMap((tree) => {
    const deepIndentSize = depth + 1;
    const deepIndent = replacer.repeat(deepIndentSize);
    const currentIndent = replacer.repeat(depth);
    const { type } = tree;
    switch (type) {
      case 'added':
        return `${deepIndent}+ ${tree.name}: ${stringify(tree.value2, depth)}`;
      case 'deleted':
        return `${deepIndent}- ${tree.name}: ${stringify(tree.value1, depth)}`;
      case 'unchanged':
        return `${deepIndent}  ${tree.name}: ${stringify(tree.value1, depth)}`;
      case 'changed':
        return `${deepIndent}- ${tree.name}: ${stringify(tree.value1, depth)}\n${deepIndent}+ ${tree.name}: ${stringify(tree.value2, depth)}`;
      case 'nested': {
        const lines = iter(tree.children, depth + 2);
        const data = [
          '{',
          ...lines,
          `${currentIndent}}`,
        ].join('\n');
        return `${deepIndent}  ${tree.name}: ${data}`;
      }
      default:
        throw new Error(`Unknown type of node: '${type}'!`);
    }
  });

  const data = iter(diffTree, 0);

  return `{\n${data.join('\n')}\n}`;
};

export default formatStylish;
