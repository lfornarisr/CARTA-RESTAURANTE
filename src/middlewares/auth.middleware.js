import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { CustomError } from "../errors/CustomError.js";

export const protect = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new CustomError("No token, authorization denied!!!", 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decodedToken) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            throw new CustomError(
              "Token has expired, please login again!!!",
              401
            );
          } else {
            throw new CustomError(
              "Invalid token, authorization denied!!!",
              401
            );
          }
        }
        return decodedToken;
      }
    );

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new CustomError("User not found!!!", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const userFound = await User.findById(req.user.id);

      if (!userFound) {
        throw new CustomError("User not found!!!", 404);
      }

      if (userFound.role !== role) {
        throw new CustomError("Authorization failed!!!", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
