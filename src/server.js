import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173", // Permitir solo este origen
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permitir cookies y encabezados de autenticación
  })
);

server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use("/api", authRoutes);
server.use("/api/users", userRoutes);
server.use("/api/menus", menuRoutes);

server.use(errorHandler);

export default server;
