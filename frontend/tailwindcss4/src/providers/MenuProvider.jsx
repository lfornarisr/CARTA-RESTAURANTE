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

  return (
    <MenuContext.Provider
      value={{
        menus,
        error,
        fetchMenus,
        handleAddMenu,
        handleDeleteMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
