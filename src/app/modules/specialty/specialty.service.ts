import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

// 1. Database Insert
const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({
    data: payload
  });
  return specialty;
};

// 2. Database Fetch Many
const getAllSpecialties = async (): Promise<Specialty[]> => {
  const specialties = await prisma.specialty.findMany({
    orderBy: {
      title: 'asc' // Automatically sort alphabetically
    }
  });
  return specialties;
};




// 4. Database Patch Update
const updateSpecialty = async (id: string, payload: Partial<Specialty>): Promise<Specialty> => {
  const updatedData = await prisma.specialty.update({
    where: { id },
    data: payload
  });
  return updatedData;
};

// 5. Database Row Removal
const deleteSpecialty = async (id: string): Promise<Specialty> => {
  const deletedData = await prisma.specialty.delete({
    where: { id }
  });
  return deletedData;
};

export const SpecialtyService = {
  createSpecialty,
  getAllSpecialties,
  updateSpecialty,
  deleteSpecialty
};