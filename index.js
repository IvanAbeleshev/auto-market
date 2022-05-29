const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const models = require('./models/models');

const Sequelize = require('./db');


const port = process.env.PORT || 5000;

const server = express();

const start = async() =>{
    try{
        await Sequelize.authenticate();
        await Sequelize.sync();
        server.listen(port, ()=>console.log(`Server started on ${port} port`));
    }catch(e){
        console.log(e);   
    }
}

start();
