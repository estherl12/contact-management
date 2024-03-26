const {constants} = require("../constants");
const errorHandler = (err , req, resp, next) =>{
    const statusCode = resp.statusCode ? resp.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            resp.json({
                title:"Validation failed",
                message:err.message,
                stackTrace:err.stack})
                break ;
        case constants.UNAUTHORIZED:
            resp.json({
                title:"unauthorized",
                message:err.message,
                stackTrace:err.stack})
                break ;
        case constants.SERVER_ERROR:
            resp.json({
                title:"server error",
                message:err.message,
                stackTrace:err.stack})
                break ;
        case constants.FORBIDDEN:
            resp.json({
                title:"forbidden",
                message:err.message,
                stackTrace:err.stack})
                break ;
        case constants.NOT_FOUND:
            resp.json({
                title:"Not Found",
                message:err.message,
                stackTrace:err.stack})
                default:
                    break ;
    }
};
module.exports = errorHandler;