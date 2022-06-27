const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {user, basket, basket} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'});

}
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
        const itemUser = await user.create({email, role, password: hashPassword});
        const itemBasket = await basket.create({userId: itemUser.id});
        const token = generateJwt(itemUser.id, itemUser.email, itemUser.role);

        return res.json({token});
    }
    
    async login(req, res, next) {
        const {email, password} = req.body;
        const itemUser = await user.findOne({where:{email}});
        if(!itemUser){
            return next(ApiError.internal('user is undefined'));
        }
        let comparePassword = bcrypt.compareSync(password, itemUser.password);
        if(!comparePassword){
            return next(ApiError.internal('wrong password'));
        }

        const token = generateJwt(itemUser.id, itemUser.email, itemUser.role); 
        return res.json({token});

    }
    
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role); 
        return res.json({token});
    }
}

module.exports = new UserContoller();