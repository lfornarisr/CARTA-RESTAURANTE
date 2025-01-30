import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  getUser,
  updateUserPassword,
} from "../controllers/user.controllers.js";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protect, admin, getUsers);

router.get("/:userId", protect, admin, getUser);

router.post("/", protect, admin, addUser);

router.put("/newpassword/:userId", protect, admin, updateUserPassword);

router.delete("/delete/:userId", protect, admin, deleteUser);

export default router;
