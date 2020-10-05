import renderResultStylish from './formatters/stylish.js';
import renderResultPlain from './formatters/plain.js';
import renderResultJson from './formatters/json.js';

const render = (format, tree) => {
  switch (format) {
    case 'stylish':
      return renderResultStylish(tree);
    case 'plain':
      return renderResultPlain(tree);
    case 'json':
      return renderResultJson(tree);
    default:
      throw new Error(`Unknown render format: '${format}'!`);
  }
};

export default render;
