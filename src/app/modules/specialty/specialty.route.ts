import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// Create a new specialty
router.post('/',checkAuth(Role.ADMIN,Role.SUPER_ADMIN), SpecialtyController.createSpecialty);

// Get a list of all specialties
router.get('/', SpecialtyController.getAllSpecialties);

// Update an existing specialty by its ID
router.patch('/:id',checkAuth(Role.ADMIN,Role.SUPER_ADMIN), SpecialtyController.updateSpecialty);

// Delete a specialty by its ID
router.delete('/:id',checkAuth(Role.ADMIN,Role.SUPER_ADMIN), SpecialtyController.deleteSpecialty);

export const SpecialtyRoutes = router;