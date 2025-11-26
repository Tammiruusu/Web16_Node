const fs = require('fs')
const path = require('path')

function appendToKayttajat(username,password){
    filePath = path.join(__dirname,'saveuser.txt')
    fs.appendFileSync(filePath, `${username}\n${password}\n\n`)
}

module.exports = {appendToKayttajat}