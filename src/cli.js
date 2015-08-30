import fs from 'fs';
import { docopt } from 'docopt';
import queryString from 'query-string';
import objectPath from 'object-path';

const mt = require('./mutabletemplate');


const packageConfig = JSON.parse(fs.readFileSync('package.json').toString());


const doc = `${packageConfig.description}

Use "-" in-place of <file> to apply transformation to stdin.

Usage:
  mt [options] <file> [(<key> <value>)...]

Options:
  --data-json=JSON              JSON data as replacement values
  --data-urlencoded=URLENCODED  URL-encoded data as replacement values
  --help                        This help text
  --version                     Show version number`;


export function run(parameters, stdin) {
    const options = docopt(doc, {
        argv: parameters,
        version: packageConfig.version,
        exit: false
    });

    return parseOptions(options, stdin);
}

function parseOptions(options, stdin) {
    const filePath = options['<file>'];
    const contents = (filePath === '-') ? stdin : loadTemplateFile(filePath);
    
    const values = parseInputValues(options['--data-json'], options['--data-urlencoded'], options['<key>'], options['<value>']);
    
    return mt.replace(contents, values);
}

function loadTemplateFile(filePath) {
    try {
       return fs.readFileSync(filePath).toString();
    }
    catch (e) {
        throw new Error('Failed to load template file');
    }
}

function parseInputValues(json, urlencoded, keys, values) {
    if (json) {
        return JSON.parse(json);
    }
    else if (urlencoded) {
        return queryString.parse(urlencoded);
    }
    else if (keys.length >= 1 && values.length >= 1) {
        let inputValues = {};
        
        for (let i = 0; i < keys.length; i++) {
            objectPath.set(inputValues, keys[i], values[i]);
        }
        
        return inputValues;
    }
    else {
        return {};
    }
}
