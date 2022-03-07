module.exports = require('axios').create({
	baseURL: 'https://cookandchief-21b0.restdb.io/rest/',
	headers: { 'cache-control': 'no-cache',
		'x-apikey': 'ad29702d0ddecb3c88bf1573c4e8e9d35dfc7' }
})
