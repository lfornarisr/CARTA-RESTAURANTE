// components/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import axios from "../axios.config.js";
import MenuContainer from "../components/MenuContainer.jsx";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <MenuContainer />

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
