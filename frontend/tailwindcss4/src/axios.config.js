import axios from "axios";

axios.defaults.withCredentials = true; // Habilitar cookies en todas las solicitudes
axios.defaults.baseURL = "http://localhost:5000"; // URL base del backend

export default axios;
