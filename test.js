var Table = require('cli-table');

var testTable = new Table({
  head: ["Heading 1", 'Heading 2'],
  colWidths: [30, 50]
});

testTable.push(
  ['Hello', 'There'],
  ['General', 'Kenobi']
);

console.log(testTable.toString());