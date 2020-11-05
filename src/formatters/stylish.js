import _ from 'lodash';

const keyOffset = 4;
const prefixOffset = 2;
const indentSymbol = ' ';
const openSymbol = '{';
const closeSymbol = '}';
const prefixes = {
  deleted: '-',
  added: '+',
  unchanged: ' ',
  nested: ' ',
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indentSize = depth * keyOffset;
  const keyIndent = indentSymbol.repeat(indentSize);
  const bracketIndent = indentSymbol.repeat(indentSize - keyOffset);
  const lines = Object.entries(value)
    .flatMap(([key, val]) => `${keyIndent}${key}: ${stringify(val, depth + 1)}`);

  return [
    openSymbol,
    ...lines,
    `${bracketIndent}${closeSymbol}`,
  ].join('\n');
};

const addPrefix = (key, type, indent) => `${indent}${prefixes[type]} ${key}`;

const formatStylish = (diffTree) => {
  const iter = (tree, depth) => tree.flatMap((node) => {
    const {
      type, name, value1, value2, children,
    } = node;

    const indentSize = depth * keyOffset;
    const keyIndent = indentSymbol.repeat(indentSize - prefixOffset);
    const bracketIndent = indentSymbol.repeat(indentSize);
    const toStr = (value) => stringify(value, depth + 1);

    switch (type) {
      case 'deleted':
        return `${addPrefix(name, type, keyIndent)}: ${toStr(value1)}`;
      case 'added':
        return `${addPrefix(name, type, keyIndent)}: ${toStr(value2)}`;
      case 'changed':
        return [
          `${addPrefix(name, 'deleted', keyIndent)}: ${toStr(value1)}`,
          `${addPrefix(name, 'added', keyIndent)}: ${toStr(value2)}`,
        ];
      case 'unchanged':
        return `${addPrefix(name, type, keyIndent)}: ${toStr(value2)}`;
      case 'nested':
        return [
          `${addPrefix(name, type, keyIndent)}: ${openSymbol}`,
          ...iter(children, depth + 1),
          `${bracketIndent}${closeSymbol}`,
        ];
      default:
        throw new Error(`Unexpected node type ${type}`);
    }
  });

  const lines = iter(diffTree, 1);

  return [openSymbol, ...lines, closeSymbol].join('\n');
};

export default formatStylish;
