import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  getUser,
  updateUserPassword,
} from "../controllers/user.controllers.js";
import { protect, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protect, checkRole("admin"), getUsers);

router.get("/:userId", protect, checkRole("admin"), getUser);

router.post("/", protect, checkRole("admin"), addUser);

router.put(
  "/newpassword/:userId",
  protect,
  checkRole("admin"),
  updateUserPassword
);

router.delete("/delete/:userId", protect, checkRole("admin"), deleteUser);

export default router;
