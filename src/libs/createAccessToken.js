import jwt from "jsonwebtoken";

export async function createAccessToken(payload, expiresIn = "1d") {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be a non-empty object");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (error, token) => {
      if (error) {
        reject(new Error(`Failed to create access token: ${error.message}`));
      } else {
        resolve(token);
      }
    });
  });
}
