let express = require("express");
let bodyParser = require("body-parser")
let cors  = require('cors');
let mongoose = require('mongoose');
let app = express();

app.use(cors())

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// mongodb+srv://vadlamudipradeep2000:02062000@cluster0.ordfowz.mongodb.net/?retryWrites=true&w=majority

let userRoutes = require('./routes/userRoutes');
let slotRoutes=  require('./routes/slotRoutes')

app.use('/user',userRoutes)
app.use('/slot',slotRoutes)


let connectionString = "mongodb+srv://vadlamudipradeep2000:02062000@cluster0.ordfowz.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(connectionString)
.then(result=>{
    app.listen(3000, ()=>{
        console.log("Server started running on Port: 3000")
    })
})