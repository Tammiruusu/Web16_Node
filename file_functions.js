const { json } = require('express/lib/response')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')


function appendToKayttajat(username,password){
    filePath = path.join(__dirname,'saveuser.txt')
    fs.appendFileSync(filePath, `${username}\n${password}\n\n`)
}

async function saveUserToJson(username,password){
    const file = 'users.json'
    let users = []

    if (fs.existsSync(file))
    {

        users = JSON.parse(fs.readFileSync(file))
    }

    //hashataan salasana
    const hashed = await bcrypt.hash(password, 12)

    users.push({username,password:hashed})



    fs.writeFileSync(file,JSON.stringify(users,null,2))
    console.log("users.json tallennettiin")

}

module.exports = {appendToKayttajat, saveUserToJson}




// function saveUserToJson(username,password){
//     const file = 'users.json'
//     let users = []
//     //jos tiedost on jo olemassa, haetaan olemassa olevat käyttäjät sieltä
//     if (fs.existsSync(file))//tarkistaa onko tiedsto jo olemassa
//     {
//         //jos läytyy, parsitaan tiedosto luettevaan muotoon
//         users = JSON.parse(fs.readFileSync(file))
//     }
//     //lisätään users:iin (tiedostoon users.json) uusi käyttäjä
//     users.push({username,password})

//     //tallenetaan tiedostoon users.json tiedosto

//     fs.writeFileSync(file,JSON.stringify(users,null,2))
//     console.log("users.json tallennettiin")

//     //null = 'replacer', jolla voidaan määrittää mitkä JSON keyt otetaan mukaan. Jos käytetään null, oetaan mukaan kaikki
//     //null tilalla voisi olla vaikka ["username"] tällöin password jätettäisiin pois
//     // 2 = intendaation (esim. voisi olla vaikka 3 tai 4)(pretty-print)
// }

// module.exports = {appendToKayttajat, saveUserToJson}