import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/restauranteDB");
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
