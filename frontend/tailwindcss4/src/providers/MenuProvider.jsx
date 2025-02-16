import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import axios from "../axios.config.js";
import MenuContext from "../contexts/MenuContext.jsx";

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState("");

  const fetchMenus = useCallback(async () => {
    try {
      const response = await axios.get("/api/menus");
      setMenus(response.data);
    } catch (error) {
      console.error("Error al obtener los menús:", error);
    }
  }, []);

  const handleAddMenu = async (menuName) => {
    try {
      const response = await axios.post("/api/menus", { name: menuName });
      setMenus([...menus, response.data.menu]);
      setError("");
    } catch (error) {
      setError("Error al añadir el menú. Inténtalo de nuevo.");
      console.error("Error al añadir el menú:", error);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await axios.delete(`/api/menus/${menuId}`);
      setMenus(menus.filter((menu) => menu._id !== menuId));
    } catch (error) {
      console.error("Error al eliminar el menú:", error);
    }
  };

  const handleAddCategory = async (menuId, categoryName) => {
    try {
      const response = await axios.post(`/menus/${menuId}/categories`, {
        name: categoryName,
      });
      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === menuId
            ? { ...menu, categories: [...menu.categories, response.data] }
            : menu
        )
      );
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (menuId, categoryId) => {
    try {
      await axios.delete(`/menus/${menuId}/categories/${categoryId}`);
      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === menuId
            ? {
                ...menu,
                categories: menu.categories.filter(
                  (cat) => cat._id !== categoryId
                ),
              }
            : menu
        )
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddDish = async (menuId, categoryId, dishData) => {
    try {
      const response = await axios.post(
        `/menus/${menuId}/categories/${categoryId}/dishes`,
        dishData
      );
      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === menuId
            ? {
                ...menu,
                categories: menu.categories.map((cat) =>
                  cat._id === categoryId
                    ? { ...cat, dishes: [...cat.dishes, response.data] }
                    : cat
                ),
              }
            : menu
        )
      );
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };

  const handleDeleteDish = async (menuId, categoryId, dishId) => {
    try {
      await axios.delete(
        `/menus/${menuId}/categories/${categoryId}/dishes/${dishId}`
      );
      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === menuId
            ? {
                ...menu,
                categories: menu.categories.map((cat) =>
                  cat._id === categoryId
                    ? {
                        ...cat,
                        dishes: cat.dishes.filter(
                          (dish) => dish._id !== dishId
                        ),
                      }
                    : cat
                ),
              }
            : menu
        )
      );
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menus,
        error,
        fetchMenus,
        handleAddMenu,
        handleDeleteMenu,
        handleAddCategory,
        handleDeleteCategory,
        handleAddDish,
        handleDeleteDish,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
