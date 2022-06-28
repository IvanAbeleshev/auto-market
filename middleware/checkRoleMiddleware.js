const jwt = require('jsonwebtoken');

module.exports = function(role){
    return function(req, res, next){
        if(req.method==="OPTIONS"){
            next();    
        }
        try{
            const token = req.headers.authorization.split(' ')[1];// Bearer aisdnwaouibfaosud
            if(!token){
                res.status(401).json({message: 'user unauthorizate'});    
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.role !== role){
                res.status(403).json({message: 'forbidden'});    
            }
            req.user = decoded;
            next();
    
        }catch(e){
            res.status(401).json({message: 'user unauthorizate'});
        }
    };
}; 

