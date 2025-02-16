import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { CustomError } from "../errors/CustomError.js"; // Importar el error personalizado

export const addUser = async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    if (!username || !password) {
      throw new CustomError("Usuario y contraseña requeridos", 400);
    }
    if (password.length < 6) {
      throw new CustomError(
        "La contraseña debe tener al menos 6 caracteres",
        400
      );
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: passwordHash, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Usuario creado correctamente", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length === 0) {
      throw new CustomError("No se encontraron usuarios", 404);
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
      throw new CustomError("Usuario no encontrado", 404);
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
      throw new CustomError("Usuario no encontrado", 404);
    }
    if (userId === req.user.id) {
      throw new CustomError("No puedes borrar tu propio usuario", 403);
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (req, res, next) => {
  const { userId } = req.params;
  const { newPassword } = req.body;
  try {
    if (!newPassword || newPassword.length < 6) {
      throw new CustomError(
        "La contraseña debe tener al menos 6 caracteres",
        404
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("Usuario no encontrado", 404);
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new CustomError(
        "La nueva contraseña debe ser diferente a la anterior",
        400
      );
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await user.save();
    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};
