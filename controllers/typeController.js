const {typeProduct} = require('../models/models');
const ApiError = require('../error/apiError');

class TypeController{
    async create(req, res) {
        const {name} = req.body;
        const type = await typeProduct.create({name});
        return res.json(type);
    }
    
    async getAll(req, res) {
        const types = await typeProduct.findAll();
        return res.json(types);
    }
}

module.exports = new TypeController();