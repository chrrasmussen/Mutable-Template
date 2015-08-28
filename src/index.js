#!/usr/bin/env node

import fs from 'fs';
import { docopt } from 'docopt';
import stdin from 'get-stdin';
import queryString from 'query-string';

const mt = require('./mutabletemplate');


const packageConfig = JSON.parse(fs.readFileSync('package.json').toString());


const doc = `
${packageConfig.description}

Use "-" in-place of <file> to apply transformation to stdin.

Usage:
  mt [options] <file> [(<key> <value>)...]

Options:
  --data-json=JSON              JSON data as replacement values
  --data-urlencoded=URLENCODED  URL-encoded data as replacement values
  --help                        This help text
  --version                     Show version number and quit
`;

const options = docopt(doc, {
    // argv: ['--data-json', '{"a": "b"}', '--input-file', 'test/yaml-test-before.yml'],
    // argv: ['--data-urlencoded', 'a=b', '--input-file', 'test/yaml-test-before.yml'],
    argv: ['--help'],
    // argv: ['test/yaml-test-before.yml', 'port', '8000', 'c', 'd'],
    version: packageConfig.version
});

// let inputDataPromise = getInputDataPromise(options['--input-file']);


// function getInputDataPromise(inputFile) {
//     return new Promise((resolve, reject) => {
//         if (inputFile) {
//             try {
//                 resolve(fs.readFileSync(inputFile).toString());
//             }
//             catch (e) {
//                 reject(`Unable to read input file (${inputFile})`);
//             }
//         }
//         else {
//             stdin(data => resolve(data));
//         }
//     });
// }

// function getStdinPromise() {
//     return new Promise((resolve, reject) => {
//         stdin(data => resolve(data));
//     });
// }

// function parseData(json, urlencoded) {
//     if (json) {
//         return JSON.parse(json);
//     }
//     else if (urlencoded) {
//         return queryString.parse(urlencoded);
//     }
//     // TODO: Add more
// }

console.log(options);
