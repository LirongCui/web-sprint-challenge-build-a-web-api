// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model');
const Action = require('../actions/actions-model');

const {validateProjectId, validateProject} = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try{
        const updatedProject = await Project.update(req.params.id, req.body)
        res.status(201).json(updatedProject)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        const project = await Project.remove(req.params.id)
        res.status(200).json(project)
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', async (req, res, next) => {
    try{
        const actions = await Project.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

module.exports = router;