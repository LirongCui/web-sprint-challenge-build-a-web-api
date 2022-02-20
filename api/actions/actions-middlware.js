// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId (req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: 'no action found'
            })
        } else {
            req.action = action
        }
    } catch (err) {
        res.status(500).json({
            message: 'error'
        })
    }
    next()
}

async function validateAction (req, res, next) {
    try {
        const {notes, description, completed, project_id} = req.body
        if (!notes || !description || !completed || !project_id) {
            res.status(400).json({
                message: 'all fields required'
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({
            message:'error'
        })
    }
}

module.exports = {
    validateActionId,
    validateAction
}