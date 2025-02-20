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
      const response = await axios.post(`/api/menus/${menuId}/categories`, {
        name: categoryName,
      });

      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === menuId
            ? {
                ...menu,
                categories: [...menu.categories, response.data.category],
              }
            : menu
        )
      );

      setError("");
    } catch (error) {
      setError("Error al añadir la categoría");
      console.log(error);
    }
  };

  const handleDeleteCategory = async (menuId, categoryId) => {
    try {
      await axios.delete(`/api/menus/${menuId}/categories/${categoryId}`);

      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === menuId
            ? {
                ...menu,
                categories: menu.categories.filter(
                  (category) => category._id !== categoryId
                ),
              }
            : menu
        )
      );
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const handleAddDish = async (
    menuId,
    categoryId,
    dishName,
    dishPrice,
    dishDescription
  ) => {
    try {
      const response = await axios.post(
        `/api/menus/${menuId}/categories/${categoryId}/dishes`,
        {
          name: dishName,
          price: dishPrice,
          description: dishDescription,
        }
      );

      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === menuId
            ? {
                ...menu,
                categories: menu.categories.map((category) =>
                  category._id === categoryId
                    ? {
                        ...category,
                        dishes: [...category.dishes, response.data.dish],
                      }
                    : category
                ),
              }
            : menu
        )
      );
      setError("");
    } catch (error) {
      setError("Error al añadir el plato");
      console.error("Error detallado:", error.response?.data); // Muestra el mensaje de error del servidor
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
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
