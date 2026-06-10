import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import catchAsync from "../../shared/catchAsync"; // Double check this relative path matches your directory layout
import { sendResponse } from "../../shared/sendResponse";




// 1. Create Specialty
const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SpecialtyService.createSpecialty(payload);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty created successfully!",
    data: result
  });

});

// 2. Get All Specialties
const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtyService.getAllSpecialties();

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialties retrieved successfully!",
    data: result
  });
});

// 3. Update Specialty
const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await SpecialtyService.updateSpecialty(id as string, payload);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,  
    message: "Specialty updated successfully!",
    data: result
  });

});

// 4. Delete Specialty
const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialtyService.deleteSpecialty(id as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialty deleted successfully!",
    data: result
  });

});

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialties,
  updateSpecialty,
  deleteSpecialty
};