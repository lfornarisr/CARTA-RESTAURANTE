import { Router } from "express";
import {
  createMenu,
  deleteMenu,
  addCategory,
  deleteCategory,
  getMenu,
  addDishToCategory,
  deleteDishFromCategory,
  updateDishInCategory,
} from "../controllers/menu.controllers.js";
import { protect, checkRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protect, createMenu);

router.get("/:menuId", protect, getMenu);

router.delete("/:menuId", protect, checkRole("admin"), deleteMenu);

router.post("/:menuId/categories", protect, addCategory);

router.delete("/:menuId/categories/:categoryId", protect, deleteCategory);

router.post(
  "/:menuId/categories/:categoryId/dishes",
  protect,
  addDishToCategory
);

router.delete(
  "/:menuId/categories/:categoryId/dishes/:dishId",
  protect,
  deleteDishFromCategory
);

router.put(
  "/:menuId/categories/:categoryId/dishes/:dishId",
  protect,
  updateDishInCategory
);

export default router;
