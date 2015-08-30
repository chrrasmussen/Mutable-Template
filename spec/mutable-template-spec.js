const mutableTemplate = require('../src/mutable-template');
const resources = require('./helpers/resources');


describe('MT-REPLACE on same line', () => {
    it('works for YAML', () => {
        const inputFile = resources.load('yaml-test-before.yml');
        const expectation = resources.load('yaml-test-after.yml');

        const result = mutableTemplate.replace(inputFile, {
            value: 'Replaced value'
        });

        expect(result).toEqual(expectation);
    });

    it('works for HTML', () => {
        const inputFile = resources.load('html-test-before.html');
        const expectation = resources.load('html-test-after.html');

        const result = mutableTemplate.replace(inputFile, {
            base: '/replaced/path'
        });

        expect(result).toEqual(expectation);
    });
});
