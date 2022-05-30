const Router = require('express');
const { user } = require('pg/lib/defaults');
const router = new Router();

//import routers from js-files
const productRouter = require('./productRouter');
const typeRouter = require('./typeProductRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.use('/type_product', typeRouter);
router.use('/product', productRouter);

module.exports = router;