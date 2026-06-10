import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// Routes that do not require an ID
router.get("/",
    checkAuth(Role.ADMIN,Role.SUPER_ADMIN,Role.PATIENT),
    doctorController.getAllDoctors);

// Routes that require an ID, chained for cleanliness
router.route("/:id")
    .get(checkAuth(Role.ADMIN,Role.SUPER_ADMIN),doctorController.getDoctorById)
    .patch(checkAuth(Role.ADMIN,Role.SUPER_ADMIN),doctorController.updateDoctor)
    .delete(checkAuth(Role.ADMIN,Role.SUPER_ADMIN),doctorController.softDelete);

export const doctorRoutes = router;