const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const morgan = require('morgan');
const helmet = require('helmet');
const projectRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/projects', projectRouter);
// server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    console.log(res)
})

module.exports = server;
