class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went Wrong !!",
        errors = [],
        stack = ""
    ){
        super(Error) //calls the original Error class constructor

        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;

        if(stack) this.stack = stack
        else{
            Error.captureStackTrace(this, this.stack)
        }

    }
}

export default ApiError