import { CustomAPIError } from "../errors/customError.js";

const errorHandlerMiddleware = (err, req, res, next)=>{
    if( err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message});
    }
    else{
        console.log(err.message);
        
        return res.status(500).json({msg: "Something went wrong!"});
    }
}

export default errorHandlerMiddleware;