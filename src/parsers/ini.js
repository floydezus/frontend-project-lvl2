import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const object = ini.parse(data);
  const numberifyValues = (tree) => {
    const numberifyValuesInner = (value) => {
      if (_.isObject(value)) {
        return numberifyValues(value);
      }
      const result = parseFloat(value);
      return Number.isNaN(result) ? value : result;
    };
    return _.mapValues(tree, numberifyValuesInner);
  };
  return numberifyValues(object);
};
export default parseIni;
