import server from "./server.js";
import { connectDB, disconnectDB } from "./db.js";
import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    logger.info("Connected to the database");

    const app = server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });

    const shutdown = async () => {
      logger.info("Shutting down server...");

      app.close(async () => {
        logger.info("Server closed");

        await disconnectDB();
        logger.info("Disconnected from the database");

        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();