const cli = require('../src/cli');
const resources = require('./helpers/resources');


describe('CLI', () => {
    const inputFile = resources.load('yaml-test-before.yml');
    const expectation = resources.load('yaml-test-after.yml');
    
    it('works with JSON data', () => {
        const json = JSON.stringify({
            value: 'Replaced value'
        });
        const result = cli.run([`--data-json=${json}`, '-'], inputFile);
        
        expect(result).toEqual(expectation);
    });
    
    it('works with URL-encoded data', () => {
        const urlEncoded = 'value=Replaced%20value';
        const result = cli.run([`--data-urlencoded=${urlEncoded}`, '-'], inputFile);
        
        expect(result).toEqual(expectation);
    });
    
    it('works with command line parameters', () => {
        const result = cli.run(['-', 'value', 'Replaced value'], inputFile);
        
        expect(result).toEqual(expectation);
    });
});
