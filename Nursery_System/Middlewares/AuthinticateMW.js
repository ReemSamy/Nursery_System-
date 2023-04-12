const jwt = require ("jsonwebtoken");
module.exports = (request,response,next)=>{

    try{
        const token = request.get("Authorization").split(" ")[1];
        const decodedToken = jwt.verify(token,"PD_JS");
        request.decodedToken = decodedToken ;

        next();
    }
    catch(error){

        next(new Error ("Not Authenticated"));
    }
   
}

module.exports.checkAdmin = (request , response , next) =>{

    if (request.decodedToken.role == "admin")
    {
        next()
    }

    else
    {
        next (new Error("Not Authorized"));
    }
}


module.exports.checkTeacher = (request , response , next) =>{

    if (request.decodedToken.role == "teacher")
    {
        next()
    }

    else
    {
        next (new Error("Not Authorized"));
    }
}