import { Router } from "express";
import {
  getMenus,
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
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  addCategorySchema,
  addDishToCategorySchema,
  deleteCategorySchema,
  deleteDishFromCategorySchema,
  deleteMenuSchema,
  getMenuSchema,
  updateDishInCategorySchema,
} from "../schemas/menu.schema.js";

const router = Router();

router.get("/", protect, getMenus);

router.post("/", protect, createMenu);

router.get("/:menuId", protect, validateSchema(getMenuSchema), getMenu);

router.delete(
  "/:menuId",
  protect,
  checkRole("admin"),
  validateSchema(deleteMenuSchema),
  deleteMenu
);

router.post(
  "/:menuId/categories",
  protect,
  validateSchema(addCategorySchema),
  addCategory
);

router.delete(
  "/:menuId/categories/:categoryId",
  protect,
  validateSchema(deleteCategorySchema),
  deleteCategory
);

router.post(
  "/:menuId/categories/:categoryId/dishes",
  protect,
  validateSchema(addDishToCategorySchema),
  addDishToCategory
);

router.delete(
  "/:menuId/categories/:categoryId/dishes/:dishId",
  protect,
  validateSchema(deleteDishFromCategorySchema),
  deleteDishFromCategory
);

router.put(
  "/:menuId/categories/:categoryId/dishes/:dishId",
  protect,
  validateSchema(updateDishInCategorySchema),
  updateDishInCategory
);

export default router;
