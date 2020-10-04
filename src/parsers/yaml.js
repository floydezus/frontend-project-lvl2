import yaml from 'js-yaml';

const parseYaml = (data) => yaml.load(data);
export default parseYaml;
