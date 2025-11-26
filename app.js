const express = require('express')
const session = require('express-session')
const sanMod = require('./sanonnat')
//const ff = require('./file_functions')
const fs = require('fs')
const ff = require('./file_functions')

const path = require('path')


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
    const users = ff.loadUsers('users.json')
    console.log(users[0])


    res.render('index', {randomQuote})
})

app.get('/login', (req, res) => {
    res.render('login', {virhe:""})
})


app.post('/login', async(req, res) => {
    const randomIndex = Math.floor(Math.random() * sanMod.sanonnat.length);
    const randomQuote = sanMod.sanonnat[randomIndex];

    const users = ff.loadUsers('users.json')
    console.log(users[0])

    const user = req.body.username
    const hashed = "$2b$12$/F784Xp2mRDdpVM5P86R7uAzKZCRaTAOgHNcVO/42l2GiYBGqM1sy"
    const passwordCorrect = await ff.checkPassword(req.body.password, hashed)

    if (passwordCorrect == true){
        res.render('welcome', {kayttajanimi:req.body.username, randomQuote:randomQuote})    
    }
    else {
        res.render('login', {virhe: "Virheelliset tiedot"})
    }
    
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
