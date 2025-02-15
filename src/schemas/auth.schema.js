import { z } from "zod";
import {
  passwordValidationSchema,
  usernameValidationSchema,
} from "./user.schema.js";

export const loginSchema = z.object({
  username: usernameValidationSchema,
  password: passwordValidationSchema,
});
