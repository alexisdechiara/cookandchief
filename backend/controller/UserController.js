const model = require('../model/UserModel')
const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

passport.use(new JwtStrategy(jwtOptions, async function(payload, next) {
			const user = await model.findAll().then(users => {return users.find(user => user.email === payload.email)})

			if (user) {
				next(null, user)
			} else {
				next(null, false)
			}
		})
)

router.post('/register', async(req, res) => {
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const email = req.body.email;
	const password = req.body.password;
	const user = await model.findAll().then(users => { return users.find(user => user.email === email)});
	if(!user) {
		const hashedPassword = await bcrypt.hash(password, saltRounds).then(hash => {return hash});
		model.create(firstname, lastname, email, hashedPassword).then(res.json({exists: false})).catch(e => console.error(e));
	} else {
		res.json({exists: true});
	}
})

router.post('/login', async(req, res) => {

	const email = req.body.email
	const password = req.body.password

	if (!email || !password) {
		res.status(401).json({ error: 'Email or password was not provided.' })
		return
	}

	const user = await model.findAll().then(users => { return users.find(user => user.email === email)});

	if (!user || await bcrypt.compare(password, user.password) === false) {
		res.status(401).json({ error: 'Email / password do not match.' })
		return
	}

	const userJwt = jwt.sign({ email: user.email }, secret)

	res.json({ jwt: userJwt, user : user})
})

module.exports = router;
