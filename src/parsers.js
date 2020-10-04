import * as fs from 'fs';
import * as path from 'path';
import parseJson from './parsers/json.js';
import parseYaml from './parsers/yaml.js';
import parseIni from './parsers/ini.js';

const getParser = (extName, content) => {
  if ((extName === '') || (extName === '.json')) {
    return parseJson(content);
  } if ((extName === '.yaml') || (extName === '.yml')) {
    return parseYaml(content);
  } if (extName === '.ini') {
    return parseIni(content);
  }
  return null;
};

const parseFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    return getParser(path.extname(filePath), content);
  }
  return null;
};

export default parseFile;
