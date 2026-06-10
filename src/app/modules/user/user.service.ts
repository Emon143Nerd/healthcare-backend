import { Role, Specialty } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateAdmin, ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: ICreateDoctorPayload) => {

    const specialties: Specialty[] = [];

    for (const specialtyId of payload.specialties) {
        const specialty = await prisma.specialty.findUnique({
            where: {
                id: specialtyId
            }
        })
        if (!specialty) {
            // throw new Error(`Specialty with id ${specialtyId} not found`);
            throw new Error("Specialty not found");
            // throw new AppError(status.NOT_FOUND, `Specialty with id ${specialtyId} not found`);
        }
        specialties.push(specialty);
    }


    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.doctor.email
        }
    })

    if (userExists) {
        // throw new Error("User with this email already exists");
        // throw new AppError(status.CONFLICT, "User with this email already exists");
        throw new Error("user already exists");
    }

    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.doctor.email,
            password: payload.password,
            role: Role.DOCTOR,
            name: payload.doctor.name,
            needPasswordChange: true,
        }
    })

    //* create doctor profile in transaction
    try {
        const result = await prisma.$transaction(async (tx) => {
            const doctorData = await tx.doctor.create({
                data: {
                    userId: userData.user.id,
                    ...payload.doctor,
                }
            })

            const doctorSpecialtyData = specialties.map((specialty) => {
                return {
                    doctorId: doctorData.id,
                    specialtyId: specialty.id,
                }
            })

            await tx.doctorSpecialty.createMany({
                data: doctorSpecialtyData
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    specialties: {
                        select: {
                            specialty: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })

            return doctor;

        })

        return result;
    } catch (error) {
        console.log("Transaction error : ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw error;
    }
}

const createAdmin =async (payload: ICreateAdmin) => {

    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.admin.email
        }
    })

    if(userExists) {
        throw new Error("User with this email already exists");
    }

    //* create userAcc with betterAuth
    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.admin.email,
            password: payload.password,
            role: Role.ADMIN,
            name: payload.admin.name,
            needPasswordChange: true,
            rememberMe: false,
        }
    })

    //* create admin profile in transaction
    try{
        const result = await prisma.$transaction(async (tx) => {
            const admin = await tx.admin.create({
                data: {
                    userId: userData.user.id,
                    name: payload.admin.name,
                    email: payload.admin.email,
                    profilePhoto: payload.admin.profilePhoto,
                    contactNumber: payload.admin.contactNumber,
                }
            })

    //* fetch created Admin with user data
    const createdAdmin = await tx.admin.findUnique({
        where: {
            id: admin.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            contactNumber: true,
            createdAt: true,
            updatedAt: true,
            isDeleted: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    status: true,
                }
            }
        }
    })

            return createdAdmin;
        })

        return result;  

    } catch (error) {
        console.log("Transaction error : ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw error;
    }
}

export const UserService = {
     createDoctor
    , createAdmin
}; 