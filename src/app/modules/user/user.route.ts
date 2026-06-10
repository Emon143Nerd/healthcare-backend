import { Router } from "express";
import { userController } from "./user.controller";

import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";





const router = Router();

//* create doctor route
router.post(
    "/create-doctor",
    validateRequest(userValidation.createDoctorZodSchema),
    userController.createDoctor
);

//* create admin route
router.post(
    "/create-admin",
    checkAuth("SUPER_ADMIN"),
    validateRequest(userValidation.createAdminValidationSchema)
    ,userController.createAdmin
);


// router.post("/create-superadmin", userController.createDoctor);


export const userRoutes = router;


