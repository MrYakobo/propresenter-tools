var proReplace = require('../lib/main')
var editor = require('editor')
var fs = require('fs')
var tmp = require('tmp')

function main(argv, map) {
    if (argv.outfile) {
        proReplace.file(argv.source, map).write(argv.outfile, () => {
            console.log('Wrote result to ' + argv.outfile + '.')
        })
    } else if (argv.f) {
        //replace original file
        proReplace.file(argv.source, map).write(argv.source, () => {
            console.log('Overwrote result to ' + argv.source + '.')
        })
    } else {
        //output to stdout
        proReplace(argv.source, map).then((res) => {
            console.log(res)
        })
    }
}

var args = require('yargs').command({
        command: 'linebreak <source> [outfile] [flags]',
        handler: (argv) => {
            main(argv, old => old.replace(/\n$/gm, ''))
        }
    })
    .command({
        command: 'arbitary <source> <outfile> [mapfile]',
        handler: (argv) => {
            if (typeof (argv.mapfile) !== 'undefined') {
                cb(eval(fs.readFileSync(argv.file)))
            } else {
                let t = tmp.fileSync({
                    prefix: 'protools-map-function',
                    postfix: '.js'
                })
                let str =
`function(old){
    //write your logic here in this manner: return old.replace('god','God')
    //then, save this file and exit the editor (gracefully)
}`
                fs.writeFileSync(t.name, str)
                editor(t.name, (code, sig) => {
                    if (code == 0) {
                        let code = fs.readFileSync(t.name, 'utf8')
                        t.removeCallback()
                        if (code != str) {
                            let res = eval()
                            cb(res)
                        } else{
                            console.log('Nothing changed, aborting.')
                        }
                    }
                })
            }

            function cb(map) {
                proReplace.file(argv.source, map).write(argv.outfile, () => {
                    console.log('Arbitary map applied, result saved to ' + argv.outfile + '.')
                })
            }
        }
    })
    .alias('f', 'force')
    .describe('f', 'Force overwrite of source file. If omitted and outfile not provided, pipe to stdout.')
    .demandCommand()
    .argv