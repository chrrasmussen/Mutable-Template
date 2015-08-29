import fs from 'fs';

const mt = require('../src/mutabletemplate');


describe('MT-REPLACE on same line', () => {
    it('works for YAML', () => {
        const inputFile = loadResource('yaml-test-before.yml');
        const expectation = loadResource('yaml-test-after.yml');

        const result = mt.replace(inputFile, {
            value: 'Replaced value'
        });

        expect(result).toEqual(expectation);
    });

    it('works for HTML', () => {
        const inputFile = loadResource('html-test-before.html');
        const expectation = loadResource('html-test-after.html');

        const result = mt.replace(inputFile, {
            base: '/replaced/path'
        });

        expect(result).toEqual(expectation);
    });
});


function loadResource(filename) {
    return fs.readFileSync(`${__dirname}/resources/${filename}`).toString();
}
