// components/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import axios from "../axios.config.js";
import MenuContainer from "../components/MenuContainer.jsx";
import Button from "../components/ui/Button.jsx";

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
    <div className="p-8 flex-col">
      <div className="flex justify-end">
        <Button
          onClick={handleLogout}
          className="flex-end bg-red-500 text-white hover:bg-red-600"
        >
          Cerrar sesión
        </Button>
      </div>

      <MenuContainer />
    </div>
  );
}

export default Dashboard;
