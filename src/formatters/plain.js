import _ from 'lodash';

const setPlainStringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof (value) === 'string') ? `'${value}'` : `${value}`;
};
const formatPlain = (arrayResult) => {
  const getNodesString = (tree, parent = '') => {
    if (tree.type !== 'nested') {
      const val1 = setPlainStringify(tree.value1);
      const val2 = setPlainStringify(tree.value2);
      if (tree.type === 'unchanged') {
        return 'unchanged';
      }
      if (tree.type === 'added') {
        return `Property '${parent}.${tree.name}' was added with value: ${val2}`;
      }
      if (tree.type === 'deleted') {
        return `Property '${parent}.${tree.name}' was removed`;
      }
      if (tree.type === 'changed') {
        return `Property '${parent}.${tree.name}' was updated. From ${val1} to ${val2}`;
      }
      return tree;
    }
    const { children } = tree;
    const relativeNodes = children.map((e) => getNodesString(e, `${parent}.${tree.name}`));

    return relativeNodes;
  };

  return _.flattenDeep(arrayResult
    .map((e) => getNodesString(e, '')))
    .filter((value) => (value !== 'unchanged'))
    .map((e) => e.replace('\'.', '\''))
    .join('\n');
};

export default formatPlain;
