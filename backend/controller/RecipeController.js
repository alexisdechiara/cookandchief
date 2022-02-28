const model = require('../model/RecipeModel')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	res.send(await model.findAll().then(e => {return e}))
})

router.route("/:id")
	//findOne
	.get(async (req, res) => {
		res.send(await model.findOne(req.params.id).then(e => {return e}))
	})
	//update
	.put(async (req, res) => {
		await model.update(req.params.id, req.body);
	})
	//delete
	.delete(async (req, res) => {
		await model.remove(req.params.id);
	});

module.exports = router;
