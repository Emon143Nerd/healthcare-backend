import status from "http-status";
import z from "zod";
import { TErrorSources } from "../interfaces/error.interface";

export const handleZodError = (err: z.ZodError)=>{
    const statusCode = status.BAD_REQUEST;
    const message = "Zod Validation error.";
    const errorSources : TErrorSources[] =[];

        err.issues.forEach((issue) => {
            errorSources.push({
                path: issue.path.join(" => ") || "unknown",
                message: issue.message,
            });
        });

        return {
            success: false,
            statusCode,
            message,
            errorSources
        }
}