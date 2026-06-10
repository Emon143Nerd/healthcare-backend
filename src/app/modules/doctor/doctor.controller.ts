import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorService } from "./doctor.service";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
    const result = await doctorService.getAllDoctors();
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Fetched doctors list successfully",
        data: result,
    });
})

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
    const result = await doctorService.getDoctorById(req.params.id as string);
    sendResponse(res, { httpStatusCode: 200, success: true, message: "Doctor fetched", data: result });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await doctorService.updateDoctor(req.params.id as string, req.body);
    sendResponse(res, { httpStatusCode: 200, success: true, message: "Doctor updated", data: result });
});

const softDelete = catchAsync(async (req: Request, res: Response) => {
    const result = await doctorService.softDeleteDoctor(req.params.id as string);
    sendResponse(res, { httpStatusCode: 200, success: true, message: "Doctor deleted", data: result });
});

export const doctorController = {
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    softDelete
}