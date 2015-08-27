import fs from 'fs';
const muttem = require('./muttem');

// Test YAML
const yamlTestBefore = fs.readFileSync('test/yaml-test-before.yml').toString();
const yamlTestAfter = fs.readFileSync('test/yaml-test-after.yml').toString();

const yamlResult = muttem.replace(yamlTestBefore, {
    value: 'Replaced value'
});

console.log(yamlResult);
console.log(yamlResult == yamlTestAfter);

// Test HTML
const htmlTestBefore = fs.readFileSync('test/html-test-before.html').toString();
const htmlTestAfter = fs.readFileSync('test/html-test-after.html').toString();

const htmlResult = muttem.replace(htmlTestBefore, {
    base: '/replaced/path'
});

console.log(htmlResult);
console.log(htmlResult == htmlTestAfter);