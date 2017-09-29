var proReplace = require('../lib/main')

var args = require('yargs').command({
        command: 'linebreak <sourcefolder> [outfolder]',
        handler: (argv) => {
            if (argv.outfolder) {
                proReplace.folder(argv.sourcefolder, old => old.replace(/\n$/gm, '')).write(argv.outfolder, () => {
                    console.log('Wrote to folder!')
                })
            } else {
                proReplace.folder(argv.sourcefolder, old => old.replace(/\n$/gm, '')).overwrite(()=>{
                    console.log('Overwrote folder!')
                })
            }
        }
    })
    .demandCommand()
    .argv