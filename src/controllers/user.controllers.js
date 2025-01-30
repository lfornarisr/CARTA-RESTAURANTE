import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
  const { username, password, admin } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: passwordHash, admin });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully!!!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user!!!" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.json(allUsers);
  } catch (error) {
    res.status(400).json({ message: "No users!!!" });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!!!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user!!!" });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!!!" });
    if (userId === req.user.id) throw new Error();
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User delete successfully!!!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user!!!" });
  }
};

export const updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!!!" });
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await userFound.save();
    res.status(200).json({ message: "Password updated successfully!!!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password!!!" });
  }
};
