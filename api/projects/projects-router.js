// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model');
// const Actions = require('../actions/actions-model');

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


module.exports = router;