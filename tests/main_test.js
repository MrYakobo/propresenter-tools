var main = require('../lib/main')
var fs = require('fs')
function writeTest(){
    main(__dirname + '/herre.pro6', old=>old.replace('å','@')).write(__dirname + '/herre_out.pro6')
}
function isSame(){
    let old = fs.readFileSync(__dirname + '/herre.pro6','utf8')
    main(__dirname + '/herre.pro6', old=>old).then((replaced)=>{
        if(old === replaced){
            console.log('Nothing changed (good!)')
        }
        else{
            console.log('Something was changed in the conversion...')
            console.log('input document length: ' + old.length + "; output document length: " + replaced.length)
        }
    })
}

// writeTest()
isSame()