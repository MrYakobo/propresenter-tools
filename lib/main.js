var fs = require('fs')

var base64 = require('base-64')
var translator = require('./translator')
/*
An edit goes like this:
read (via regex) all "RTFData">(.+?)<
pipe through base64 decode
pipe through translator.js
pipe through regexmatching
pipe through user-supplied-mapfunction
replace old b64 with new b64
save file
*/

module.exports = function (filename, mapfunction) {
    function main() {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, (er, buff) => {
                if (er) reject(er)

                let str = buff.toString()
                let reg = /"RTFData">(.+?)</g
                let i

                while (i = reg.exec(str)) {
                    let dec = base64.decode(i[1])
                    let slide = translator.decode(dec)
                    let newSlide = mapfunction(slide)
                    let b64 = base64.encode(translator.encode(newSlide))
                    str = str.replace(i[1], b64)
                }
                resolve(str)
            })
        })
    }
    return {
        write(path, cb) {
            main().then(str => fs.writeFile(path, str, (err)=>{
                cb()
            }))
        },
        then(cb) {
            main().then(cb)
        }
    }
}