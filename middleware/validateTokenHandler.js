const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,resp,next)=>{
    let token;
    let authHeader = req.header.Authorization || req.header.authorization;
    if(authHeader&&authHeader.startWith("Bearer")){
        let token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                resp.status(401);
                throw new Error("user is not authorized");
            }
           req.user = decoded.user ;
           next();
           if(!token){
            resp.send(401);
            throw new Error("unauthorised");
           }
        })
    }
})
module.exports = validateToken ;