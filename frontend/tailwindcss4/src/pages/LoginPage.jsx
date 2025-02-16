import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";

axios.defaults.withCredentials = true;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/login", {
        username: data.username,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Error al iniciar sesión",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Iniciar sesión
        </h1>

        {errors.root && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {errors.root.message}
          </div>
        )}

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Usuario
          </label>

          <Input
            type="text"
            id="username"
            {...register("username", { required: "El usuario es obligatorio" })}
            placeholder="Ingresa tu usuario"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contraseña
          </label>

          <Input
            type="password"
            id="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            placeholder="Ingresa tu contraseña"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
