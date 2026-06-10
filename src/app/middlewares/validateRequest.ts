import { NextFunction, Request, Response } from 'express';
import { z } from 'zod'; // Use this if your Zod version supports it, or use z.AnyZodObject

export const validateRequest = (zodSchema: z.ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsedResult = zodSchema.safeParse(req.body);

        if (!parsedResult.success) {
            console.log("Zod error", parsedResult.error);
            return next(parsedResult.error);
        }

        req.body = parsedResult.data; // Sanitized data
        next();
    }
}
