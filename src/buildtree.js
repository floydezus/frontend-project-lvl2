import _ from 'lodash';

const buildTree = (data1, data2) => {
  const data1Cloned = _.cloneDeep(data1);
  const objectForMerge = _.merge(data1Cloned, data2);
  const arrayKeys = Object.keys(objectForMerge).sort();

  const reduceResult = (acc, currentVal) => {
    // где-то в начале проверяем плоский ли файл
    if (_.has(data1, currentVal) && _.has(data2, currentVal)) {
      if ((typeof (data1[currentVal]) === 'object') && (typeof (data2[currentVal]) === 'object')) {
        // тяжелый случай
        acc.push({ name: currentVal, children: buildTree(data1[currentVal], data2[currentVal]), type: 'nested' });
      } else if (data1[currentVal] === data2[currentVal]) {
        // ключ не изменился
        acc.push({
          name: currentVal,
          value1: data1[currentVal],
          value2: data2[currentVal],
          type: 'unchanged',
        });
      } else {
        // ключ был, но изменился
        acc.push({
          name: currentVal,
          value1: data1[currentVal],
          value2: data2[currentVal],
          type: 'changed',
        });
      }
    } else if (_.has(data1, currentVal)) {
      // удалили ключ
      acc.push({ name: currentVal, value1: data1[currentVal], type: 'deleted' });
    } else if (_.has(data2, currentVal)) {
      // добавили ключ
      acc.push({ name: currentVal, value2: data2[currentVal], type: 'added' });
    }

    return acc;
  };
  return arrayKeys.reduce(reduceResult, []);
};

export default buildTree;
