import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    case 'json':
      return formatJson(tree);
    default:
      throw new Error(`Unknown render format: '${format}'!`);
  }
};

export default formatter;
