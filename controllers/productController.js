const uuid = require('uuid');
const path = require('path');
const {product} = require('../models/models');
const ApiError = require('../error/apiError');

class productController{
    async create(req, res, next) {
        try{
            const {name, full_name, articl, unit, remainder, price, typeProductId} = req.body;
            const {img} = req.files;
            let filesName = uuid.v4()+".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', filesName));
    
            const productData = await product.create({name, full_name, articl, unit, remainder, price, typeProductId, img: filesName});
            return res.json(productData);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
        
    }
    
    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }
}

module.exports = new productController();