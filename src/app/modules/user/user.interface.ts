import { Role, Gender } from "../../../generated/prisma/enums"; // Import Role

export interface ICreateDoctorPayload {
  password: string;
  doctor: {
    name: string;
    email: string;
    role?: Role;
    averageRating?: number;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    registrationNumber: string;
    experience?: number;
    gender: Gender;
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
  }
  specialties: string[]
}

export interface ICreateAdmin {
  password: string;
  admin: {
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber: string;
  };
}