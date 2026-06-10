import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { doctorRoutes } from "../modules/doctor/doctor.route";

const router = Router();


router.use("/auth", AuthRoute);

router.use("/specialties", SpecialtyRoutes);

router.use("/users", userRoutes);

router.use("/doctors", doctorRoutes);

export const IndexRoutes = router;