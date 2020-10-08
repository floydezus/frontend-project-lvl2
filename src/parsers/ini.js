import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const object = ini.parse(data);
  const base = 10;
  const parse = (tree) => {
    const fixNumbers = (value) => {
      if (typeof (value) === 'object') {
        return parse(value);
      }
      const result = parseInt(value, base);
      return isNaN(result) ? value : result;
    };
    return _.mapValues(tree, fixNumbers);
  };
  return parse(object);
};
export default parseIni;
