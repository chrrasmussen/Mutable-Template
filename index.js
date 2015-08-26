#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;


var distFile = 'dist/index.js';
var sourceFile = 'src/index.js';
var nodeExec = 'node';
var babelExec = './node_modules/.bin/babel-node';


var distExists = false;
try {
    var stats = fs.lstatSync(distFile);
    if (stats.isFile()) {
        distExists = true;
    }
}
catch (e) {
    // Silence error
}

var args;
if (distExists) {
    args = [nodeExec, distFile];
}
else {
    args = [babelExec, sourceFile];
}

var command = args.join(' ');
var child = exec(command, function(err, stdout, stderr) {
    if (!err) {
        console.log(stdout);
    }
    else {
        console.log(stderr);
    }
});
