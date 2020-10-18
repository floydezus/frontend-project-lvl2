import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value)) ? `'${value}'` : `${value}`;
};
const formatPlain = (diffTree) => {
  const iter = (tree, parentName = '') => {
    const { type } = tree;
    switch (type) {
      case 'added':
        return `Property '${parentName}.${tree.name}' was added with value: ${stringifyValue(tree.value2)}`;
      case 'deleted':
        return `Property '${parentName}.${tree.name}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${parentName}.${tree.name}' was updated. From ${stringifyValue(tree.value1)} to ${stringifyValue(tree.value2)}`;
      case 'nested':
        return tree.children.flatMap((node) => iter(node, `${parentName}.${tree.name}`));
      default:
        throw new Error(`Unknown type of node: '${type}'!`);
    }
  };

  const strings = diffTree
    .flatMap((e) => iter(e, ''));

  return strings
    .filter(_.identity)
    .map((e) => e.replace('\'.', '\''))
    .join('\n');
};

export default formatPlain;
