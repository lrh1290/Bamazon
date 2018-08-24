#!/usr/bin/env node

var command = process.argv[2];

switch(command) {
  case 'help':
    help();
    break;
  case 'setup':
    setup();
    break;
  default:
    help();
    break;
};

