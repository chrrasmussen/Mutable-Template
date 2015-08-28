import fs from 'fs';

const mt = require('../src/mutabletemplate');


// Test YAML
const yamlTestBefore = fs.readFileSync('resources/yaml-test-before.yml').toString();
const yamlTestAfter = fs.readFileSync('resources/yaml-test-after.yml').toString();

const yamlResult = mt.replace(yamlTestBefore, {
    value: 'Replaced value'
});

console.log(yamlResult);
console.log(yamlResult == yamlTestAfter);

// Test HTML
const htmlTestBefore = fs.readFileSync('resources/html-test-before.html').toString();
const htmlTestAfter = fs.readFileSync('resources/html-test-after.html').toString();

const htmlResult = mt.replace(htmlTestBefore, {
    base: '/replaced/path'
});

console.log(htmlResult);
console.log(htmlResult == htmlTestAfter);