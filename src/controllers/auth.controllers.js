import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/createAccessToken.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });

    if (!userFound)
      return res.status(400).json({ message: "User not found!!!" });

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch)
      return res.status(400).json({ message: "Incorrect password!!!" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({ id: userFound._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};
