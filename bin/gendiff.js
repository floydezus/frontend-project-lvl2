#!/usr/bin/node

// const pack = require('../../package.json');
import pkg from 'commander';
import gendiff from '../index.js';
// import {version, description} from '../../package.json';
const { Command } = pkg;
// console.log(pack.version);
const program = new Command();

program
  .version('1.1.0')
  // .version(version)
  .description('Compares two configuration files and shows a difference.')
  // .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
