import Menu from "../models/menu.model.js";

export const createMenu = async (req, res) => {
  try {
    const newMenu = new Menu();
    await newMenu.save();
    res
      .status(201)
      .json({ message: "Menu created successfully!!!", menu: newMenu });
  } catch (error) {
    res.status(500).json({ message: "Error creating menu!!!" });
  }
};

export const getMenu = async (req, res) => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu!!!" });
  }
};

export const deleteMenu = async (req, res) => {
  const { menuId } = req.params;

  try {
    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found!!!" });
    }
    res.status(200).json({ message: "Menu deleted successfully!!!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu!!!" });
  }
};

export const addCategory = async (req, res) => {
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
    res.status(500).json({ message: "Error adding category!!!" });
  }
};

export const deleteCategory = async (req, res) => {
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
    res.status(500).json({ message: "Error deleting category!!!" });
  }
};

export const addDishToCategory = async (req, res) => {
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
    res.status(500).json({ message: "Error adding dish!!!" });
  }
};

export const deleteDishFromCategory = async (req, res) => {
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
    res.status(500).json({ message: "Error deleting dish!!!" });
  }
};

export const updateDishInCategory = async (req, res) => {
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
    res.status(500).json({ message: "Error updating dish!!!" });
  }
};
