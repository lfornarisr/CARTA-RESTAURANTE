// components/Menu.jsx
import { useMenu } from "../contexts/MenuContext.jsx";

const Menu = ({ menu }) => {
  const { handleDeleteMenu } = useMenu();

  return (
    <li className="p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{menu.name}</h3>
        </div>
        <button
          onClick={() => handleDeleteMenu(menu._id)}
          className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Menu;
