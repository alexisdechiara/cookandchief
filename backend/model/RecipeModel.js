const http = require('./main.js')

module.exports = {
	async findAll() {
		return await http.get('recipes').then(e => {return e.data}).catch(e => console.error(e))
	},

	async findOne(id) {
		return await http.get('recipes/' + id).then(e => {return e.data}).catch((e => console.error(e)))
	},

	async remove(id) {
		await http.delete('recipes/' + id).then(e => console.log("suppesion de " + e.body.name)).catch(e => console.error(e))
	},

	async update(id, data) {
		await http.put('recipes/'+ id, data).then(e => console.log("modification de " + e.body.name)).catch(e => console.error(e))
	},

	async create(data) {
		return await http.post('recipes', data).then(e => console.log("création de " + e.body.name)).catch(e => console.error(e))
	}
}

