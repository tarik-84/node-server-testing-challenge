const express = require("express");
const data = require('./accounts-model')

const router = express.Router()



router.get('/', async (req, res, next) => {
    try {
		const accounts = await data.find()
		res.json(accounts)
	} catch (err) {
		next(err)
	}
})

router.get('/:id', async (req, res, next) => {
    try {
        const account = await data.findById(req.params.id)
		res.json(account)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
    try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget,
        }
		const account = await data.add(payload)
		res.status(201).json(account)
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async (req, res, next) => {
    try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget,
        }
        
		const account = await data.update(req.params.id, payload)
		res.json(account)
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', async (req, res, next) => {
    try {
		await data.remove(req.params.id)
		res.status(202).json({
            message:'the account has been removed'
        })
	} catch (err) {
		next(err)
	}
})


module.exports = router