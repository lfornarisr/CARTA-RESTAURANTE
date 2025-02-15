import { z } from "zod";
import { mongoIdSchema } from "./user.schema.js";

export const dishNameValidationSchema = z.string().nonempty("Name required");

export const dishPriceValidationSchema = z
  .number()
  .positive("Price must be positive");

export const dishDescriptionValidationSchema = z
  .string()
  .nonempty("Description required");

export const dishSchema = z.object({
  name: dishNameValidationSchema,
  price: dishPriceValidationSchema,
  description: dishDescriptionValidationSchema,
});

export const categoryValidationSchema = z.object({
  name: z.string().nonempty("Name required"),
});

export const getMenuSchema = z.object({
  params: z.object({ menuID: mongoIdSchema }),
});

export const deleteMenuSchema = {
  params: z.object({ menuId: mongoIdSchema }),
};

export const addCategorySchema = z.object({
  params: z.object({ menuID: mongoIdSchema }),
  body: categoryValidationSchema,
});

export const deleteCategorySchema = z.object({
  params: z.object({ menuID: mongoIdSchema, categoryID: mongoIdSchema }),
});

export const addDishToCategorySchema = z.object({
  params: z.object({
    menuID: mongoIdSchema,
    categoryID: mongoIdSchema,
  }),
  body: dishSchema,
});

export const deleteDishFromCategorySchema = z.object({
  params: z.object({
    menuID: mongoIdSchema,
    categoryID: mongoIdSchema,
    dishID: mongoIdSchema,
  }),
});

export const updateDishInCategorySchema = z.object({
  params: z.object({
    menuID: mongoIdSchema,
    categoryID: mongoIdSchema,
    dishID: mongoIdSchema,
  }),
  body: dishSchema,
});
