import { z, ZodType } from "zod";
import {
  ChangePasswordFormData,
  Email,
  LoginFormData,
  PasswordResetFormData,
  SignupFormData,
} from "./form";

const usernameValidation = new RegExp(/^[a-zA-Z][a-zA-Z0-9._-]{3,16}$/);

export const LoginSchema: ZodType<LoginFormData> = z.object({
  identifier: z.string().min(1, { message: "Vui lòng nhập tên đăng nhập" }),
  password: z.string().min(1, { message: "Vui lòng nhập mật khẩu" }),
});

export const SignupSchema: ZodType<SignupFormData> = z
  .object({
    email: z.string().email({ message: "Email không hợp lệ" }),

    username: z.string().regex(usernameValidation, {
      message:
        "Tên đăng nhập phải bắt đầu bằng một chữ cái và có độ dài từ 3 đến 16 ký tự, và chỉ được chứa các chữ cái, số, dấu gạch dưới (_), dấu gạch ngang (-), và dấu chấm (.)",
    }),

    fullName: z.string().min(3, { message: "Tên phải dài ít nhất 3 ký tự" }),

    password: z
      .string()
      .min(8, { message: "Mật khẩu phải dài ít nhất 8 ký tự" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export const ChangePasswordSchema: ZodType<ChangePasswordFormData> = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Mật khẩu phải dài ít nhất 8 ký tự" }),
    newPassword: z
      .string()
      .min(8, { message: "Mật khẩu phải dài ít nhất 8 ký tự" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới không khớp",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Mật khẩu mới không được giống mật khẩu cũ",
    path: ["newPassword"],
  });

export const EmailSchema: ZodType<Email> = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
});

export const NewPasswordSchema: ZodType<PasswordResetFormData> = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Mật khẩu phải dài ít nhất 8 ký tự" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type TokenValidationResponse = {
  isValid: boolean;
};
