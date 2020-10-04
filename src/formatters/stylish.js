const renderResultStylish = (arrayResult) => {
  const callback = (value) => {
    const val1 = (typeof (value.value1) === 'object') ? JSON.stringify(value.value1) : value.value1;
    const val2 = (typeof (value.value2) === 'object') ? JSON.stringify(value.value2) : value.value2;

    if (value.type === 'changed') {
      return `  - ${value.name}: ${val1}\n  + ${value.name}: ${val2}`;
    }
    if (value.type === 'unchanged') {
      return `    ${value.name}: ${val1}`;
    }
    if (value.type === 'deleted') {
      return `  - ${value.name}: ${val1}`;
    }
    if (value.type === 'added') {
      return `  + ${value.name}: ${val2}`;
    }
    if (value.type === 'nested') {
      return `  ${value.name}: {\n\t${renderResultStylish(value.children)}\n\t}\n`;
    }
    return value;
  };
  const stringResult = `{\n  ${arrayResult.flatMap(callback).join('\n').trim()}\n}`;
  return stringResult;
};
export default renderResultStylish;
