 const http = require('./main.js')

 module.exports = {
	async findAll() {
		return await http.get('recipes').then(res => {return res.data}).catch(e => console.error(e))
	},

	async findOne(id) {
		return await http.get('recipes/' + id).then(res => {return res.data}).catch((e => console.error(e)))
	},

	async remove(id) {
		await http.delete('recipes/' + id).then(e => console.log("suppression de " + e.body.result)).catch(e => console.error(e))
	},

	async update(id, data) {
		await http.put('recipes/'+ id, data).then(e => console.log("modification de " + e.body.result)).catch(e => console.error("erreur lors de la modification"))
	},

	async create(data) {
		//TODO
	}
}

