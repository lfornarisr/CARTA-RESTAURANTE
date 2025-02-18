import Input from "./ui/Input";
import Button from "./ui/Button";
import { useForm } from "react-hook-form";
import useMenu from "../hooks/useMenu";

function AddMenuForm() {
  const { error, handleAddMenu } = useMenu();

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
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Añadir nuevo menú</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
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
        <Button type="submit" className="max-w-fit">
          Añadir menú
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default AddMenuForm;
