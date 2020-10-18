import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.union(keys1, keys2).sort();
  const build = (value) => {
    if (!_.has(data1, value)) {
      return { name: value, value2: data2[value], type: 'added' };
    } if (!_.has(data2, value)) {
      return { name: value, value1: data1[value], type: 'deleted' };
    } if (_.isObject(data1[value]) && _.isObject(data2[value])) {
      return { name: value, children: buildTree(data1[value], data2[value]), type: 'nested' };
    } if (data1[value] !== data2[value]) {
      return {
        name: value, value1: data1[value], value2: data2[value], type: 'changed',
      };
    }
    return {
      name: value, value1: data1[value], value2: data2[value], type: 'unchanged',
    };
  };
  return commonKeys.map(build);
};

export default buildTree;
