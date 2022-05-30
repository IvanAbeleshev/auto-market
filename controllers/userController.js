const ApiError = require('../error/apiError');

class UserContoller{//grououng function on class
    async registration(req, res) {

    }
    
    async login(req, res) {
        
    }
    
    async check(req, res, next) {
        const {id} = req.query;
        if(!id){
            return next(ApiError.bedRequest('missing id'))
        }
        res.json(id);
    }
}

module.exports = new UserContoller();