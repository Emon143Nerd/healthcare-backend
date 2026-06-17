import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import status from "http-status";
import z from "zod";
import { handleZodError } from "../errorHelpers/handleZodError";  // Assuming this is where your helper lives
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { deleteFileFromCloudinary } from "../config/cloudinary.config";



export const globalErrorHandler = async(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any, 
    req: Request, 
    res: Response, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction 
) => {
    if (envVars.NODE_ENV === "development") {
        console.error("Error: ", err);
    }

    if(req.file){
        await deleteFileFromCloudinary(req.file.path)
    }

    if(req.files && Array.isArray(req.files) && req.files.length > 0){
        const imageUrls = req.files.map((file) => file.path);
        await Promise.all(imageUrls.map(url => deleteFileFromCloudinary(url))); 
    }

    let errorSources: TErrorSources[] = [];
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let message: string = "Internal server error.";
    let stack: string | undefined = undefined;

    if (err instanceof z.ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources];
        stack =err.stack
    }else if (err instanceof Error) {
        statusCode = status.INTERNAL_SERVER_ERROR;
        message = err.message || "Something went wrong";
        stack = err.stack;
    }

    const errorResponse: TErrorResponse = {
        success: false,
        message,
        error: err.message || "Something went wrong",
        // This matches the optional '?' in our updated TErrorResponse interface perfectly
        errorSources: errorSources.length > 0 ? errorSources : undefined, 
        stack: envVars.NODE_ENV ==='development' ? stack: undefined // This will be 'undefined' if not set, which is fine for our interface
    };

    res.status(statusCode).json(errorResponse);
};