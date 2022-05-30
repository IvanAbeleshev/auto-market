class TypeController{
    async create(req, res) {
        const {name, full_name, articl, unit, remainder, price} = req.body;
        const {img} = req.files;
    }
    
    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }
}

module.exports = new TypeController();