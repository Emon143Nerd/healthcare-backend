import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

const createDoctorZodSchema = z.object({
    password: z.string("Password is required").min(6,"Password must be at least 8 chars").max(20,"Password must be less than 20 chars"),
    doctor: z.object({
        name: z.string("Name is required").min(5,"Name must be at least 5 chars").max(30,"Name must be less than 30 chars"),
        email: z.string("Email is required").email("Invalid email format"),
        contactNumber: z.string("Contact number is required").min(11,"Contact number must be at least 11 chars").max(14,"Contact number must be less than 14 chars"),
        address: z.string().min(10,"Address must be at least 10 chars").max(100,"Address must be less than 100 chars").optional(),
        registrationNumber: z.string("Registration number is required"),
        experience: z.number("Experience is required").int("Experience is required").min(0,"Experience must be a positive number").max(50,"Experience must be less than 50 years"),
        gender: z.enum([Gender.MALE,Gender.FEMALE,Gender.OTHER]),
        appointmentFee: z.number("Appointment fee is required").min(0,"Appointment fee must be a positive number").max(10000,"Appointment fee must be less than 10000"),
        designation: z.string("Designation is required").min(2,"Designation must be at least 2 chars").max(50,"Designation must be less than 50 chars"),
        qualification: z.string("Qualification is required")
                .min(2, "Qualification must be at least 2 chars"),
        currentWorkingPlace: z.string("Current working place is required" )
                .min(2, "Current working place must be at least 2 chars")
    }),
    specialties: z.array(z.uuid(),"Specialty ID must be a string").min(1,"At least one specialty is required"),
})

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    admin: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.email("Invalid email format"),
      profilePhoto: z.url("Invalid URL format").optional(),
      contactNumber: z.string().min(1, "Contact number is required"),
    }),
  }),
});

export const userValidation = {
    createDoctorZodSchema,
    createAdminValidationSchema
}

