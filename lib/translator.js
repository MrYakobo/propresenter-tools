var fs = require('fs')

let db = JSON.parse(fs.readFileSync(__dirname + '/translations.json'))

module.exports.encode = (str)=>{
    let retval = str
    for(var k in db){
        retval = retval.replace(new RegExp(db[k], 'g'), `\\'${k}`)
    }
    return retval
}

module.exports.decode = (str)=>{
    let retval = str
    for(var k in db){
        retval = retval.replace(new RegExp(`\\\\'${k}`, 'g'), db[k])
    }
    return retval
}