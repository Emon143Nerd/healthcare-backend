import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await UserService.createDoctor(payload);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createAdmin(req.body);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Admin profile created successfully",
        data: result,
    });
})

export const userController = {
    createDoctor,
    createAdmin
}