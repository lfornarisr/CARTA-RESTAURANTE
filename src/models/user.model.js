import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
      message: "El rol debe ser uno de los siguientes: 'admin', 'user'.",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
