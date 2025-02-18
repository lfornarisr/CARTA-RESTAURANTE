import Button from "./ui/Button";
import Input from "./ui/Input";
import { useForm } from "react-hook-form";
import useMenu from "../hooks/useMenu.js";
import PropTypes from "prop-types";

function AddCategoryForm({ menuId }) {
  const { error, handleAddCategory } = useMenu();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await handleAddCategory(menuId, data.categoryName);
    reset(); // Limpiar el formulario después de enviar
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg">Añadir nueva categoría</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-fit">
        <Input
          type="text"
          placeholder="Nombre de la categoría"
          className={`p-2 border rounded-lg w-full ${
            errors.categoryName ? "border-red-500" : "border-gray-300"
          }`}
          {...register("categoryName", {
            required: "El nombre de la categoría es obligatorio",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
          })}
        />
        {errors.categoryName && (
          <p className="text-red-500 text-sm">{errors.categoryName.message}</p>
        )}
        <Button type="submit">Añadir categoría</Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

AddCategoryForm.propTypes = {
  menuId: PropTypes.string.isRequired,
};

export default AddCategoryForm;
