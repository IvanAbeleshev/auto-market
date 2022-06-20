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
        let {typeProductId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 12;
        let offset = page * limit - limit;
        let setOfProducts;
        if(!typeProductId){
            setOfProducts = await product.findAndCountAll({limit, offset});
        }else
        {
            setOfProducts = await product.findAndCountAll({where:{typeProductId}, limit, offset});
        }
        return res.json(setOfProducts);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const item = await product.findOne({where:{id}});
        return res.json(item);
    }
}

module.exports = new productController();