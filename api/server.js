const express = require("express");
const cors = require('cors')
const accountRouter= require('../accounts/accounts-router')

const server = express();

server.use(express.json());
server.use(cors())

server.use('/accounts', accountRouter)



module.exports = server;
