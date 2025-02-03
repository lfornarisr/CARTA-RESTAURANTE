import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { CustomError } from "../errors/CustomError.js"; // Importar el error personalizado

export const addUser = async (req, res, next) => {
  const { username, password, admin, role } = req.body;

  try {
    if (!username || !password) {
      throw new CustomError("Username and password are required!!!", 400);
    }
    if (password.length < 6) {
      throw new CustomError(
        "Password must be at least 6 characters long!!!",
        400
      );
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: passwordHash, admin, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully!!!", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length === 0) {
      throw new CustomError("No users found!!!", 404);
    }
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found!!!", 404);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found!!!", 404);
    }
    if (userId === req.user.id) {
      throw new CustomError("You cannot delete your own account!!!", 403);
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully!!!" });
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (req, res, next) => {
  const { userId } = req.params;
  const { newPassword } = req.body;
  try {
    if (!newPassword || newPassword.length < 6) {
      const error = new Error("Password must be at least 6 characters long!!!");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found!!!");
      error.statusCode = 404;
      throw error;
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      const error = new Error(
        "New password must be different from the old one!!!"
      );
      error.statusCode = 400;
      throw error;
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await user.save();
    res.status(200).json({ message: "Password updated successfully!!!" });
  } catch (error) {
    next(error);
  }
};
