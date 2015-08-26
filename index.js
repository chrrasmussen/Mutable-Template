#!/usr/bin/env node

// SOURCE: http://javascriptplayground.com/blog/2015/03/node-command-line-tool/

var userArgs = process.argv.slice(2);
var searchPattern = userArgs[0];

var exec = require('child_process').exec;
var child = exec('ls -a | grep ' + searchPattern, function(err, stdout, stderr) {
  console.log(stdout);
});