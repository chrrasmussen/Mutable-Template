import fs from 'fs';

const cli = require('../src/cli');


describe('CLI', () => {
    const inputFile = loadResource('yaml-test-before.yml');
    const expectation = loadResource('yaml-test-after.yml');
    
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
    
    it('works with JSON', () => {
        const result = cli.run(['-', 'value', 'Replaced value'], inputFile);
        
        expect(result).toEqual(expectation);
    });
});


function loadResource(filename) {
    return fs.readFileSync(`${__dirname}/resources/${filename}`).toString();
}
