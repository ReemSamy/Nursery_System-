const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const login = require('./Routes/AuthinticationRoute');
const authinticatedMW= require('./Middlewares/AuthinticateMW');
const teacherRoutes=require("./Routes/teacherRoutes");
const classRoutes=require("./Routes/classRoutes");
const childRoutes=require("./Routes/childRoutes");


const server = express();
//1 connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/Nursery_Project')
.then(()=>
{
    server.listen(process.env.PORT||8080, () => {
        console.log("server is listenining ,.....");
    });
    console.log("Connected to mongodb");
}).catch((error)=>{
    console.log("Connection to mongodb failed"+error);
})
//2
server.use(morgan('dev'));
//3
server.use(express.json());//to parse the body

//4 
server.use(login);
server.use(authinticatedMW);
server.use(teacherRoutes);
server.use(classRoutes);
server.use(childRoutes);

//Not Found 
server.use((request, respsone) => {
    respsone.status(404).json({ message: 'Not Found' })
    
});
//6 Error
server.use((error, request, response, next) => {

    response.status(500).json({ message: " exception : " + error });
});


