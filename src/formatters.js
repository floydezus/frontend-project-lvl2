import renderResultStylish from './formatters/stylish.js';
import renderResultPlain from './formatters/plain.js';
import renderResultJson from './formatters/json.js';

const renderFormat = (format, tree) => {
  if (format === 'stylish') {
    return renderResultStylish(tree);
  } if (format === 'plain') {
    return renderResultPlain(tree);
  } if (format === 'json') {
    // return JSON.stringify(tree);
    return renderResultJson(tree);
  }
  return null;
};

export default renderFormat;
