import useMenu from "../hooks/useMenu.js";
import PropTypes from "prop-types";
import AddCategoryForm from "./AddCategoryForm.jsx";
import Button from "./ui/Button.jsx";
import CategoryList from "./CategoryList.jsx";

const Menu = ({ menu }) => {
  const { handleDeleteMenu } = useMenu();

  return (
    <li className="p-4 border rounded-lg">
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="font-medium">{menu.name}</h3>
        </div>
        <CategoryList categories={menu.categories} />
        <AddCategoryForm categories={menu.categories} menuId={menu._id} />
        <Button
          onClick={() => handleDeleteMenu(menu._id)}
          className="bg-red-500 max-w-fit hover:bg-red-600 transition-colors"
        >
          Eliminar
        </Button>
      </div>
    </li>
  );
};

export default Menu;

Menu.propTypes = {
  menu: PropTypes.object.isRequired,
};
