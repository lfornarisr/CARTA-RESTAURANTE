import useMenu from "../hooks/useMenu.js";
import Menu from "./Menu.jsx";

const MenuList = () => {
  const { menus } = useMenu();

  return (
    <ul className="mt-4 space-y-2">
      {menus.map((menu) => (
        <Menu key={menu._id} menu={menu} />
      ))}
    </ul>
  );
};

export default MenuList;
