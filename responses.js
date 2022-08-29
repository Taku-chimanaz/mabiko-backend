export const notFoundHandlerFunction = (res)=>{
    res.status(404).json({
        message: "resource not found",
    })
}

export const successHandlerFunction = (res,responseData) => {
    res.json({
        message: "request successful",
        responseData
    })
}

export const internalErrHandlerFunction = (res,err) => {

    res.status(500).json({
        message: "Something went wrong",
        err: err.message
    })
}