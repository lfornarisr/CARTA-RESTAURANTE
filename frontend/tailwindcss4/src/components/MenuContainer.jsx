import AddMenuForm from "./AddMenuForm";
import useMenu from "../hooks/useMenu";
import MenuList from "./MenuList";
import { useEffect } from "react";

export default function MenuContainer() {
  const { menus, fetchMenus } = useMenu();

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  return (
    <div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Menús disponibles</h2>
        {menus.length > 0 ? <MenuList /> : <p>No hay menús disponibles.</p>}
      </div>{" "}
      <AddMenuForm />
    </div>
  );
}
