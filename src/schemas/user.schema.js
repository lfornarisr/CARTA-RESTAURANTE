import { z } from "zod";

export const usernameValidationSchema = z
  .string()
  .nonempty("Username required");

export const mongoIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB id");

export const passwordValidationSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long");

const userRoleSchema = z
  .enum(["admin", "user"], {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_enum_value":
          return { message: "Role must be 'admin' or 'user'" };
        default:
          return { message: "Wrong value" };
      }
    },
  })
  .optional();

export const addUserSchema = z.object({
  username: usernameValidationSchema,
  password: passwordValidationSchema,
  role: userRoleSchema,
});

export const updatePasswordSchema = {
  params: z.object({
    userId: mongoIdSchema,
  }),
  body: z.object({ newPassword: passwordValidationSchema }),
};

export const getUserSchema = {
  params: z.object({ userId: mongoIdSchema }),
};

export const deleteUserSchema = {
  params: z.object({ userId: mongoIdSchema }),
};
