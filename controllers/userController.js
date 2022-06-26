const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const {user, basket, basket} = require('../models/models');

class UserContoller{//grououng function on class
    async registration(req, res, next) {
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ApiError.badRequest('missing data registration'));
        }
        const candidate = await user.findOne({where:{email}});
        if(candidate){
            return next(ApiError.badRequest('email is used'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const itemuser = await user.create({email, role, password: hashPassword});
        //const basket = await basket.create()
    }
    
    async login(req, res) {
        
    }
    
    async check(req, res, next) {
        const {id} = req.query;
        if(!id){
            return next(ApiError.badRequest('missing id'));
        }
        res.json(id);
    }
}

module.exports = new UserContoller();