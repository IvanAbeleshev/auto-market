//import block
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const models = require('./models/models');
const Sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');

//----------------------------------------

const port = process.env.PORT || 5000;

const server = express();
server.use(cors());
server.use(express.json());
server.use('/api', router);

//add get
server.get('/', (req, res)=>{
    res.status(200).json({message: 'all is ok'})
});

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
