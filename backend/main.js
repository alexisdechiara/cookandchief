const PORT = process.env.PORT || 1337 // this is very important
const cors = require('cors')

const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())

const recipes = require("./controller/RecipeController");
const users = require("./controller/UserController");

app.use('/recipes',recipes)
app.use('', users)

app.listen(PORT, function () {
  console.log('Le serveur écoute sur le port ' + PORT)
})
