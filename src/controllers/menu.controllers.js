import { CustomError } from "../errors/CustomError.js";
import Menu from "../models/menu.model.js";

export const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find();

    res.status(200).json(menus);
  } catch (error) {
    next(new CustomError("Error fetching menus!!!", 500));
  }
};

export const createMenu = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required!!!" });
    }

    const newMenu = new Menu({ name });
    await newMenu.save();

    res
      .status(201)
      .json({ message: "Menu created successfully!!!", menu: newMenu });
  } catch (error) {
    next(new CustomError("Error creating menu!!!", 500));
  }
};

export const getMenu = async (req, res, next) => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }
    res.status(200).json(menu);
  } catch (error) {
    next(new CustomError("Error fetching menu!!!", 500));
  }
};

export const deleteMenu = async (req, res, next) => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }
    res.status(200).json({ message: "Menu deleted successfully!!!" });
  } catch (error) {
    next(new CustomError("Error deleting menu!!!", 500));
  }
};

export const addCategory = async (req, res, next) => {
  const { menuId } = req.params;
  const { name } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }

    menu.categories.push({ name, dishes: [] });
    await menu.save();

    res.status(200).json({ message: "Category added successfully!!!" });
  } catch (error) {
    next(new CustomError("Error adding category!!!", 500));
  }
};

export const deleteCategory = async (req, res, next) => {
  const { menuId, categoryId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }

    const category = menu.categories.id(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!!!" });
    }

    category.remove();
    await menu.save();

    res.status(200).json({ message: "Category deleted successfully!!!" });
  } catch (error) {
    next(new CustomError("Error deleting category!!!", 500));
  }
};

export const addDishToCategory = async (req, res, next) => {
  const { menuId, categoryId } = req.params;
  const { name, price, description } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }

    const category = menu.categories.id(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!!!" });
    }

    category.dishes.push({ name, price, description });
    await menu.save();

    res.status(200).json({ message: "Dish added successfully!!!" });
  } catch (error) {
    next(new CustomError("Error adding dish!!!", 500));
  }
};

export const deleteDishFromCategory = async (req, res, next) => {
  const { menuId, categoryId, dishId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }

    const category = menu.categories.id(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!!!" });
    }

    const dish = category.dishes.id(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found!!!" });
    }

    dish.remove();
    await menu.save();

    res.status(200).json({ message: "Dish deleted successfully!!!" });
  } catch (error) {
    next(new CustomError("Error deleting dish!!!", 500));
  }
};

export const updateDishInCategory = async (req, res, next) => {
  const { menuId, categoryId, dishId } = req.params;
  const { name, price, description } = req.body;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }

    const category = menu.categories.id(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found!!!" });
    }

    const dish = category.dishes.id(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found!!!" });
    }

    dish.name = name;
    dish.price = price;
    dish.description = description;
    await menu.save();

    res.status(200).json({ message: "Dish updated successfully!!!" });
  } catch (error) {
    next(new CustomError("Error updating dish!!!", 500));
  }
};
