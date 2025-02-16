import { CustomError } from "../errors/CustomError.js";
import Menu from "../models/menu.model.js";

export const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    next(new CustomError("Error obteniendo los menús", 500));
  }
};

export const createMenu = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new CustomError("El nombre es necesario para crear un menú", 400);
    }

    const newMenu = new Menu({ name });
    await newMenu.save();

    res
      .status(201)
      .json({ message: "Menú añadido correctamente", menu: newMenu });
  } catch (error) {
    next(error);
  }
};

export const getMenu = async (req, res, next) => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      throw new CustomError("Menu no encontrado", 404);
    }
    res.status(200).json(menu);
  } catch (error) {
    next(error);
  }
};

export const deleteMenu = async (req, res, next) => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) {
      throw new CustomError("Menu no encontrado", 404);
    }
    res.status(200).json({ message: "Menu eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

export const addCategory = async (req, res, next) => {
  const { menuId } = req.params;
  const { name } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      throw new CustomError("Menu no encontrado", 404);
    }

    menu.categories.push({ name, dishes: [] });
    await menu.save();

    res.status(200).json({ message: "Categoría añadida correctamente" });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { menuId, categoryId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      throw new CustomError("Menu no encontrado", 404);
    }

    const category = menu.categories.id(categoryId);
    if (!category) {
      throw new CustomError("Categoría no encontrada", 404);
    }

    category.remove();
    await menu.save();

    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

export const addDishToCategory = async (req, res, next) => {
  const { menuId, categoryId } = req.params;
  const { name, price, description } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      throw new CustomError("Menu no encontrado", 404);
    }

    const category = menu.categories.id(categoryId);
    if (!category) {
      throw new CustomError("Categoría no encontrada", 404);
    }

    category.dishes.push({ name, price, description });
    await menu.save();

    res.status(200).json({ message: "Plato añadido correctamente" });
  } catch (error) {
    next(error);
  }
};

export const deleteDishFromCategory = async (req, res, next) => {
  const { menuId, categoryId, dishId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      throw new CustomError("Menu no encontrado", 404);
    }

    const category = menu.categories.id(categoryId);
    if (!category) {
      throw new CustomError("Categoría no encontrada", 404);
    }

    const dish = category.dishes.id(dishId);
    if (!dish) {
      throw new CustomError("Plato no encontrado", 404);
    }

    dish.remove();
    await menu.save();

    res.status(200).json({ message: "Plato eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

export const updateDishInCategory = async (req, res, next) => {
  const { menuId, categoryId, dishId } = req.params;
  const { name, price, description } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      throw new CustomError("Menu no encontrado", 404);
    }

    const category = menu.categories.id(categoryId);
    if (!category) {
      throw new CustomError("Categoría no encontrada", 404);
    }

    const dish = category.dishes.id(dishId);
    if (!dish) {
      throw new CustomError("Plato no encontrado", 404);
    }

    dish.name = name;
    dish.price = price;
    dish.description = description;
    await menu.save();

    res.status(200).json({ message: "PLato actualizado correctamente" });
  } catch (error) {
    next(error);
  }
};
