#!/usr/bin/env node

import getstdin from 'get-stdin';

const cli = require('./cli');


getstdin(stdin => {
    try {
        const parameters = process.argv.slice(2);
        const stdout = cli.run(parameters, stdin);
        if (stdout) {
            console.log(stdout);
        }
    }
    catch (e) {
        if (e.message) {
            console.error(e.message);
        }

        process.exit(1);
    }
});
