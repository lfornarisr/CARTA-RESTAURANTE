import Input from "./ui/Input";
import Button from "./ui/Button";
import { useForm } from "react-hook-form";
import useMenu from "../hooks/useMenu.js";
import { useState } from "react";
import PropTypes from "prop-types";

export const AddDishForm = ({ menuId, categoryId }) => {
  const { handleAddDish } = useMenu(); // Elimina el uso de error global
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null); // Estado local para el error

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setLocalError(null); // Limpia el error antes de enviar el formulario
    try {
      await handleAddDish(
        menuId,
        categoryId,
        data.dishName,
        Number(data.dishPrice),
        data.dishDescription
      );
      reset();
    } catch (error) {
      setLocalError("Error al añadir el plato. Inténtalo de nuevo."); // Maneja el error localmente
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg">Añadir plato</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-fit">
        <Input
          type="text"
          placeholder="Nombre del plato"
          className={`p-2 border rounded-lg w-full ${
            errors.dishName ? "border-red-500" : "border-gray-300"
          }`}
          {...register("dishName", {
            required: "El nombre del plato es obligatorio",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
          })}
        />
        <Input
          type="number"
          placeholder="Precio"
          className={`p-2 border rounded-lg w-full ${
            errors.dishPrice ? "border-red-500" : "border-gray-300"
          }`}
          {...register("dishPrice", {
            required: "El precio del plato es obligatorio",
            valueAsNumber: true, // Asegura que el valor sea un número
          })}
        />
        <Input
          type="text"
          placeholder="Descripción"
          className={`p-2 border rounded-lg w-full ${
            errors.dishDescription ? "border-red-500" : "border-gray-300"
          }`}
          {...register("dishDescription")}
        />
        {errors.dishName && (
          <p className="text-red-500 text-sm">{errors.dishName.message}</p>
        )}
        {errors.dishPrice && (
          <p className="text-red-500 text-sm">{errors.dishPrice.message}</p>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Añadiendo..." : "Añadir plato"}
        </Button>
      </form>
      {localError && <p className="text-red-500 mt-2">{localError}</p>}{" "}
      {/* Muestra el error local */}
    </div>
  );
};

AddDishForm.propTypes = {
  menuId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
};
