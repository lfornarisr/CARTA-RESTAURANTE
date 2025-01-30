import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protect = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied!!!" });
  }

  jwt.verify(token, "secretkeyllevaraenviroment", (error, user) => {
    if (error) return res.status(403).json({ message: "Invalid token!!!" });
    req.user = user;
    next();
  });
};

export const admin = async (req, res, next) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found!!!" });
  if (!userFound.admin)
    return res.status(401).json({ message: "Authorization failed!!!" });
  next();
};
