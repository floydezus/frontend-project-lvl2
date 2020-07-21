#!/usr/bin/node

const { Command } = require('commander');
const pack = require('../../package.json');

const program = new Command();

program
  .arguments('<firstConfig> <secondConfig>')
  .version(pack.version)
  .description(pack.description)
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
