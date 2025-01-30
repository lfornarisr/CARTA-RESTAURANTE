import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      "secretkeyllevaraenviroment",
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      }
    );
  });
}
