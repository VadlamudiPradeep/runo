let express = require('express');
let router = express.Router();

let userController = require('../controllers/userController');

router.post('/signIn' , userController.userSignIn);
router.post('/login' , userController.signIn)

module.exports = router ; 