// Write your "actions" router here!

const express = require('express');


const Action = require('./actions-model')

const {validateActionId, validateAction} = require('./actions-middlware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
    Action.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.post('/', async (req, res, next) => {
    try {
        const {notes, description, project_id} = req.body
        if (!notes || !description || !project_id) {
            res.status(400).json({
                message: 'all fields required'
            })
        } else {
            next()
        }
        const newAction = await Action.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
    try {
        const updatedAction = await Action.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id',validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.status(200).json()
    }catch (err) {
        next(err)
    }
} )



router.use((err, req, res, next) => {
    res.status(err.status ||500).json({
        message: 'error',
        errorMessage: err.message,
        stack: err.stack
    })
})

module.exports = router;