import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use("/api", authRoutes);
server.use("/api/users", userRoutes);
server.use("/api/menus", menuRoutes);

server.use(errorHandler);

export default server;
