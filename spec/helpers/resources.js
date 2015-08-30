import fs from 'fs';


export function load(filename) {
    return fs.readFileSync(`${__dirname}/../resources/${filename}`).toString();
}
