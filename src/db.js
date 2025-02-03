import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    throw new Error("Failed to connect to the database");
  }
};
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("DB disconnected");
  } catch (error) {
    console.error("Failed to disconnect from the database:", error.message);
    throw new Error("Failed to disconnect from the database");
  }
};
