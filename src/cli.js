import fs from 'fs';
import { docopt } from 'docopt';
import queryString from 'query-string';
import objectPath from 'object-path';

const mutableTemplate = require('./mutable-template');


const packageConfig = JSON.parse(fs.readFileSync('package.json').toString());


const doc = `${packageConfig.description}

Use "-" in-place of <file> to apply transformation to stdin.

Usage:
  mutable-template [options] <file> [(<key> <value>)...]

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
    const shouldUseStdin = (filePath === '-');
    const contents = (shouldUseStdin) ? stdin : loadTemplateFile(filePath);
    
    const values = parseInputValues(options['--data-json'], options['--data-urlencoded'], options['<key>'], options['<value>']);
    
    const stdout = mutableTemplate.replace(contents, values);
    
    if (shouldUseStdin) {
        return stdout;
    }
    else {
        safeWriteFileSync('.mt_', filePath, stdout);
    }
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

function safeWriteFileSync(prefix, originalFilePath, data, options) {
    var originalFilename = getFilename(originalFilePath);
    var originalDir = getDir(originalFilePath);
    
    var tmpFilename = prefix + originalFilename;
    var tmpFilePath = originalDir + tmpFilename;
    
    fs.writeFileSync(tmpFilePath, data, options);
    fs.renameSync(tmpFilePath, originalFilePath);
}

function getFilename(filePath) {
    // SOURCE: http://stackoverflow.com/a/423385
    return filePath.replace(/^.*[\\\/]/, '');
}

function getDir(filePath) {
    // SOURCE: http://stackoverflow.com/a/7601721
    return filePath.replace(/[^\\\/]*$/, '');
}
