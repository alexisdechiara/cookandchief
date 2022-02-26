// index.js
const PORT = process.env.PORT || 1337 // this is very important
const cors = require('cors')

const express = require('express')
const app = express()

const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecret'
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const axios = require('axios').create({
  baseURL: 'https://cookandchief-21b0.restdb.io/rest/',
  headers: { 'cache-control': 'no-cache',
    'x-apikey': 'ad29702d0ddecb3c88bf1573c4e8e9d35dfc7' }
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

app.use(cors())

passport.use(
    new JwtStrategy(jwtOptions, async function(payload, next) {
      const user = await getUsers().then(users => {return users.find(user => user.email === payload.email)})

      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
)

app.use(passport.initialize())

app.use(express.json())

app.get('/recipes', async (req, res) => {
  res.send(await getRecipes().then(e => {return e}))
})

app.get('/recipe/:id', async (req, res) => {
  res.send(await getRecipe(req.params.id).then(e => {return e}))
})

app.get('/public', (req, res) => {
  res.send('public')
})

app.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('private. user:' + req.user.email)
})

app.get('/register', (req, res) => {
  const firstName = 'David';
  const lastName = 'Pujadas';
  const email = 'david.pujadas@mail.com'
  const password = 'password'
  postUser(firstName, lastName, email, password)
})

app.post('/login', async(req, res) => {

  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(401).json({ error: 'Email or password was not provided.' })
    return
  }

  const user = await getUsers().then(users => { return users.find(user => user.email === email)});

  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Email / password do not match.' })
    return
  }

  const userJwt = jwt.sign({ email: user.email }, secret)

  res.json({ jwt: userJwt, user : user})
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})

async function getUsers() {
  return await axios.get('accounts').then(res => {return res.data}).catch((e => console.error(e)))
}

async function getUser(id) {
  return await axios.get('accounts/' + id).then(res => {return res.data}).catch((e => console.error(e)))
}

function postUser(firstName, lastName, email, password) {
  axios.post('accounts', {firstname: firstName, lastname: lastName, email: email, password: password})
}

function postRecipe(name, ingredients, method, user) {
  axios.post('recipes', )
}

async function getRecipes() {
  return await axios.get('recipes').then(res => {return res.data}).catch((e => console.error(e)))
}

async function getRecipe(id) {
  return await axios.get('recipes/' + id).then(res => {return res.data}).catch((e => console.error(e)))
}

async function getIngredients() {
  return await axios.get('ingredients').then(res => {return res.data}).catch((e => console.error(e)))
}

async function getIngredient(id) {
  return await axios.get('ingredients/' + id).then(res => {return res.data}).catch((e => console.error(e)))
}
