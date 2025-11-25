const express = require('express')
const session = require('express-session')
const sanMod = require('./sanonnat')

//luodaan express applikaatio (expressjs.com)
const app = express()
//määritetään käytettävä portti
const port = 3000

app.set('view engine', 'ejs') //määritetään appi käyttämään ejs template enginenä
                        // ejs oletuksena hakee ejs-tiedostot views-kansiosta



//-----MIDLLEWARE-----------------------------------





//---- ROUTES (ENDPOINTS)--------------------------
app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent']
    console.log(userAgent)

    const userLocale = req.headers['accept-language']
    console.log(userLocale)
    
    // res.send('Hello World!')

    //req.session.user ||

    const randomIndex = Math.floor(Math.random() * sanMod.sanonnat.length);
    const randomQuote = sanMod.sanonnat[randomIndex];

    res.render('index', {randomQuote})

    //const username = "JOULUPUKKI"
    //res.render('index', {username}) //hakee index.ejs tiedoston views-kansiosta
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

