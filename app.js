const express = require('express')
const session = require('express-session')
const sanMod = require('./sanonnat')
//const ff = require('./file_functions')
const fs = require('fs')
const ff = require('./file_functions')


//luodaan express applikaatio (expressjs.com)
const app = express()
//määritetään käytettävä portti
const port = 3000



app.set('view engine', 'ejs') //määritetään appi käyttämään ejs template enginenä
                        // ejs oletuksena hakee ejs-tiedostot views-kansiosta



//-----MIDLLEWARE-----------------------------------

app.use(express.urlencoded( {extended: false}))

//---- FUNCTIONS----------------------------------


//---- ROUTES (ENDPOINTS)--------------------------
app.get('/', (req, res) => {
  const randomIndex = Math.floor(Math.random() * sanMod.sanonnat.length);
  const randomQuote = sanMod.sanonnat[randomIndex];


    res.render('index', {randomQuote})
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
  const randomIndex = Math.floor(Math.random() * sanMod.sanonnat.length);
  const randomQuote = sanMod.sanonnat[randomIndex];

   res.render('welcome', {kayttajanimi:req.body.username, randomQuote:randomQuote})
})



app.get('/', (req, res) => {
  

});


// Handle form submission

app.get('/saveuser', (req,res)=>{
  res.render('saveuser')
})

app.post('/saveuser', (req,res)=>{
  const username = req.body.username
  const password = req.body.password

  //Muumipappa on käyttäjänimi ja piippu salasana

  ff.saveUserToJson(username, password)
  res.redirect('/')
})












// app.get('/saveuser', (req, res) => {
//     res.render('saveuser')
// })

// app.post('/saveuser', (req, res) => {

//    res.redirect('/')
// })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
