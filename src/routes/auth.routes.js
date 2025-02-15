import { Router } from "express";
import { login, logout } from "../controllers/auth.controllers.js";
import { loginSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

export default router;
