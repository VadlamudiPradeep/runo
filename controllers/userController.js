let userModel  = require("../models/userModel");
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt')

function isStringValid(string) {
    if (string === undefined || string.length === 0) {
        return false;
    } else {
        return true;
    }
}


function  GenerateAccessToken(id , name){
   return jwt.sign({id , name }, "secretkey")
}


let userSignIn = async (req, res) => {
    try {
        let { name, email , phone, age, pincode, aadhar, password } = req.body;

        console.log("name: ", name, "  ", "phone: ", phone, " ", "age: ", age, "  ", "pincode: ", pincode, " ", "aadhar: ", aadhar, " ", "password: ", password);

        if (!isStringValid(name) || !isStringValid(email) || !isStringValid(phone) || !isStringValid(age) || !isStringValid(pincode) || !isStringValid(aadhar) || !isStringValid(password)) {
            return res.status(401).send({ message: 'undefined value' });
        }
        
        let salt = 10;
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                return res.status(500).send({ message: "password hashing error" });
            }

            let user = new userModel({
                name: name,
                email:email,
                phone:phone,
                age: age,
                pincode: pincode,
                aadhar: aadhar,
                password: hash
            });

            await user.save();
            return res.status(200).send({ user: user, message: 'success' });
        });
    } catch (err) {
        return res.status(500).send({ message: "something went wrong" });
    }
};

let signIn = async (req, res) => {
    try {
        let { phone, password } = req.body;
        console.log("Phone:", phone, " ", "password:", password);

        if (!isStringValid(phone) || !isStringValid(password)) {
            return res.status(204).json({ success: false, message: `Please fill all fields!` });
        }

        // Find the user by their phone number
        var user = await userModel.findOne({ phone: phone });

        console.log("user: " ,user);
        if (!user) {
            return res.status(404).json({ success: false, message: `Error(404): User ${phone} does not exist` });
        } else {
           
            bcrypt.compare(password, user.password, async (err, response) => {
                if (err) {
                    console.log(err);
                }
                if (response) {
                    const token = GenerateAccessToken(user.id, user.name);

                   
                    return res.status(201).json({ success: true, message: `User: ${user.name} logged in successfully.`, token: token });
                } else {
                    return res.status(400).json({ success: false, message: `Error(401): Entered wrong password!` });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err, message: `Something went wrong!` });
    }
};





module.exports = {
    userSignIn,
    signIn , 
    GenerateAccessToken
}