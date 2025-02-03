import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/createAccessToken.js";
import { CustomError } from "../errors/CustomError.js";

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new CustomError("User not found!!!", 400);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new CustomError("Incorrect password!!!", 400);
    }
    const token = await createAccessToken({ id: user._id });
    res.cookie("token", token);
    res.json({ id: user._id });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
