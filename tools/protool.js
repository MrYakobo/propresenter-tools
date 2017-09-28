#!/usr/bin/env node

var fs = require('fs')
var proReplace = require('../lib/main')

function main(argv) {
    console.log(argv)
    //if only two args given, dump to stdout
    if (argv.outfile) {
        proReplace(argv.file, map).write(argv.outfile, () => {
            console.log('Done!')
        })
    } else {
        proReplace(argv.file, map).then((res) => {
            console.log(res)
        })
    }
}
//map is used for the function of the program
var map
let defaultFiles = {
    file: {
        decribe: 'Input .pro6-file'
    },
    outfile: {
        describe: 'Output .pro6-file, optional. If omitted, prints to stdout'
    }
}

var argv = require('yargs')
    .usage('Usage: $0 <command> <file> <outfile>')
    .command('linebreak', 'Remove line breaks from the end of slides', defaultFiles, (argv) => {
        map = old => old.replace(/\n$/gm, '')
        main(argv)
    })
    .demandCommand(2, 'Please provide command and at least one file.')
    .argv;