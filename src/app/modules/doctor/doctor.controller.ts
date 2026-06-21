import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorService } from "./doctor.service";
import { IQueryParams } from "../../interfaces/query.interface";
import status from "http-status";

const getAllDoctors = catchAsync(
    async (req: Request, res: Response) => {
        const query = req.query;

        const result = await doctorService.getAllDoctors(query as IQueryParams);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctors fetched successfully",
            data: result.data,
            meta: result.meta,
        })
    }
)


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