import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  getUser,
  updateUserPassword,
} from "../controllers/user.controllers.js";
import { protect, checkRole } from "../middlewares/auth.middleware.js";
import {
  addUserSchema,
  deleteUserSchema,
  getUserSchema,
  updatePasswordSchema,
} from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/", protect, checkRole("admin"), getUsers);

router.get(
  "/:userId",
  protect,
  checkRole("admin"),
  validateSchema(getUserSchema),
  getUser
);

router.post(
  "/",
  protect,
  checkRole("admin"),
  validateSchema(addUserSchema),
  addUser
);

router.put(
  "/newpassword/:userId",
  protect,
  checkRole("admin"),
  validateSchema(updatePasswordSchema),
  updateUserPassword
);

router.delete(
  "/delete/:userId",

  protect,
  checkRole("admin"),
  validateSchema(deleteUserSchema),
  deleteUser
);

export default router;
