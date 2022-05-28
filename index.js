const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;

const server = express();

server.listen(port, ()=>console.log(`Server started on ${port} port`));
