
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log("token auth :"  , token);
        const user = jwt.verify(token,'secretkey');
        console.log('userID >>>> ', user.userId)
        User.findById(user.userId).then(user => {

            req.user = user; ///ver
            next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
    
      }

}

module.exports = {
    authenticate
}