import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value)) ? `'${value}'` : `${value}`;
};
const verifyNameKey = (parentName, currentNodeName) => {
  if (_.isEmpty(parentName)) {
    return `${currentNodeName}`;
  }
  return `${parentName}.${currentNodeName}`;
};
const formatPlain = (diffTree) => {
  const iter = (node, parentName = '') => node.flatMap((tree) => {
    const { type } = tree;
    const currentName = verifyNameKey(parentName, tree.name);
    switch (type) {
      case 'added':
        return `Property '${currentName}' was added with value: ${stringifyValue(tree.value2)}`;
      case 'deleted':
        return `Property '${currentName}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${currentName}' was updated. From ${stringifyValue(tree.value1)} to ${stringifyValue(tree.value2)}`;
      case 'nested':
        return iter(tree.children, currentName);
      default:
        throw new Error(`Unknown type of node: '${type}'!`);
    }
  });

  const strings = iter(diffTree, '');

  return strings
    .filter(_.identity)
    .map((e) => e.replace('\'.', '\''))
    .join('\n');
};

export default formatPlain;
