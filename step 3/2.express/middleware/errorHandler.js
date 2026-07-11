

// create error class

class Apierror extends Error{

   constructor(message, statusCode){
     super(message);
     this.statusCode = statusCode;
     this.name = "APIError" // set the error type to api error
   }

}

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req,res,next)).catch(next)
}

// exact same thing, expanded

// const asyncHandler = function(fn) {           // takes your route function
//     return function(req, res, next) {         // returns a middleware function
//         Promise.resolve(fn(req, res, next))   // runs your route
//             .catch(next)                      // if it throws, passes error to next()
//     }
// }

const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // log the error stack

    if(err instanceof Apierror){
        return res.status(err.statusCode).json({
            status: "Error",
            message: err.message
        })
    }

    // handle mongoose validation
    else if(err.name === "validationError"){
        return res.status(400).json({
            staus: "Error",
            message: "Validation Erro"
        })
    }else{
         return res.status(500).json({
            staus: "Error",
            message: "An unexpected error occured"
        })
    }

}

module.exports = {Apierror, asyncHandler, globalErrorHandler};