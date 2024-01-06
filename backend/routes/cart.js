const { getCartSize, addToCart, getUserCart, deleteItemFromCart, addToCartFromLocalstorage } = require('../controllers/cart');
const auth = require('../middleware/auth');

const router = require('express').Router();
router.use(auth);
router.route("/")
.get(auth,getUserCart);
router.route("/add").post(addToCart);
router.route("/add/local-storage").post(addToCartFromLocalstorage);
router.route("/delete/:productId").delete(deleteItemFromCart);
router.route("/size").get( getCartSize);

module.exports = router;