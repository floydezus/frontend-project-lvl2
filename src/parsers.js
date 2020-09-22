// const fs = require('fs');
// const path = require('path');
// const yaml = require('js-yaml');
// const ini = require('ini');
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (extname, content) => {
  if ((extname === '') || (extname === '.json')) {
    return JSON.parse(content);
  } if ((extname === '.yaml') || (extname === '.yml')) {
    return yaml.load(content);
  } if (extname === '.ini') {
    return ini.parse(content);
  }
};

const getObjFromFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    // console.log(path.extname(filePath));
    return getParser(path.extname(filePath), content);
  }
  return null;
};

export default getObjFromFile;
// module.exports = getObjFromFile;
