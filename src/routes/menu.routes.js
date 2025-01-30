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

const router = Router();

router.post("/", createMenu);

router.get("/:menuId", getMenu);

router.delete("/:menuId", deleteMenu);

router.post("/:menuId/categories", addCategory);

router.delete("/:menuId/categories/:categoryId", deleteCategory);

router.post("/:menuId/categories/:categoryId/dishes", addDishToCategory);

router.delete(
  "/:menuId/categories/:categoryId/dishes/:dishId",
  deleteDishFromCategory
);

router.put(
  "/:menuId/categories/:categoryId/dishes/:dishId",
  updateDishInCategory
);

export default router;
