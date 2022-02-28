const http = require('./main.js')

module.exports = {
	async findAll() {
		return await http.get('accounts').then(res => {return res.data}).catch((e => console.error(e)))
	},

	async findOne(id) {
		return await http.get('accounts/' + id).then(res => {return res.data}).catch(e => console.error(e))
	},

	async create(firstName, lastName, email, password) {
		http.post('accounts', {firstname: firstName, lastname: lastName, email: email, password: password})
	}
}
