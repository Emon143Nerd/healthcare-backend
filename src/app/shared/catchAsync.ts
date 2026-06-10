import { Request, Response, NextFunction, RequestHandler } from "express";

// This higher-order function intercepts any async router function and handles errors automatically
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;