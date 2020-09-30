#!/usr/bin/env node

import pkg from 'commander';
import gendiff from '../index.js';

const { Command } = pkg;
const program = new Command();

program
  .version('1.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<pathToFile1> <pathToFile2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((pathToFile1, pathToFile2) => {
    console.log(gendiff(pathToFile1, pathToFile2, program.format));
  })
  .parse(process.argv);
