const model = require('../model/UserModel')
const express = require('express')
const router = express.Router()

const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecret'
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

router.use(passport.initialize())

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
}

passport.use(
		new JwtStrategy(jwtOptions, async function(payload, next) {
			const user = await model.findAll().then(users => {return users.find(user => user.email === payload.email)})

			if (user) {
				next(null, user)
			} else {
				next(null, false)
			}
		})
)

router.get('/register', (req, res) => {
	const firstName = 'David';
	const lastName = 'Pujadas';
	const email = 'david.pujadas@mail.com'
	const password = 'password'
	model.create(firstName, lastName, email, password)
})

router.post('/login', async(req, res) => {

	const email = req.body.email
	const password = req.body.password

	if (!email || !password) {
		res.status(401).json({ error: 'Email or password was not provided.' })
		return
	}

	const user = await model.findAll().then(users => { return users.find(user => user.email === email)});

	if (!user || user.password !== password) {
		res.status(401).json({ error: 'Email / password do not match.' })
		return
	}

	const userJwt = jwt.sign({ email: user.email }, secret)

	res.json({ jwt: userJwt, user : user})
})

module.exports = router;
