import parseJson from './parsers/json.js';
import parseYaml from './parsers/yaml.js';
import parseIni from './parsers/ini.js';

const parse = (content, format) => {
  switch (format) {
    case 'json':
      return parseJson(content);
    case 'yaml':
    case 'yml':
      return parseYaml(content);
    case 'ini':
      return parseIni(content);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default parse;
