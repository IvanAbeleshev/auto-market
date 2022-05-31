const Sequelize = require('../db'); // import connection to db
const {DataTypes} = require('sequelize'); //for descriptions type filds
const { type } = require('express/lib/response');

const user = Sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },

});

const basket = Sequelize.define('basket',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } 
});

const basketProduct = Sequelize.define('basket_product',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    count: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull:false
    }
});

const product = Sequelize.define('product',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    full_name: {
        type: DataTypes.STRING,
    },
    articl: {
        type: DataTypes.STRING,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull:false
    },
    remainder: {
        type: DataTypes.FLOAT,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    img:{
        type: DataTypes.STRING, 
    }
});

const typeProduct = Sequelize.define('type_product',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    }
});

user.hasOne(basket);
basket.belongsTo(user);

basket.hasMany(basketProduct);
basketProduct.belongsTo(basket);

typeProduct.hasMany(product);
product.belongsTo(typeProduct);

product.hasMany(basketProduct);
basketProduct.belongsTo(product);

module.exports = {
    user, 
    basket,
    basketProduct,
    product,
    typeProduct
}