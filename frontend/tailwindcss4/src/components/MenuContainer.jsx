import { useMenu } from "../contexts/MenuContext.jsx";
import { useForm } from "react-hook-form";
import MenuList from "./MenuList.jsx";
import { useEffect } from "react";

export default function MenuContainer() {
  const { menus, error, handleAddMenu, fetchMenus } = useMenu();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await handleAddMenu(data.menuName);
    reset();
  };

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  return (
    <div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Añadir nuevo menú</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del menú"
            className={`p-2 border rounded-lg w-full ${
              errors.menuName ? "border-red-500" : "border-gray-300"
            }`}
            {...register("menuName", {
              required: "El nombre del menú es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            })}
          />
          {errors.menuName && (
            <p className="text-red-500 text-sm">{errors.menuName.message}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Añadir menú
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Menús disponibles</h2>
        {menus.length > 0 ? <MenuList /> : <p>No hay menús disponibles.</p>}
      </div>
    </div>
  );
}
