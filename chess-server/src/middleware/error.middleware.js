import ApiError from "../utils/apiError.js";

export const errorMiddleware = (err, req, res, next)=>{
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors
        })
    }
    console.error(err.stack) //now if no error from our custom ApiError then fallback to the general error stack
    next()
    return res.status(500).json({
        sucess: false,
        message: "internal server error !!!"
    })
    
}