import { z, ZodType } from "zod";

type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  profileImageUrl: string;
  roles: Array<Role>;
};

type Role = {
  id: number;
  name: string;
};

const usernameValidation = new RegExp(/^[a-zA-Z][a-zA-Z0-9._-]{3,16}$/);

export const UpdateProfileSchema = z.object({
  username: z.string().regex(usernameValidation, {
    message:
      "Tên đăng nhập phải bắt đầu bằng một chữ cái và có độ dài từ 3 đến 16 ký tự, và chỉ được chứa các chữ cái, số, dấu gạch dưới (_), dấu gạch ngang (-), và dấu chấm (.)",
  }),

  fullName: z.string().min(3, { message: "Tên phải dài ít nhất 3 ký tự" }),

  email: z.string().email({ message: "Email không hợp lệ" }),

  phoneNumber: z.string().length(10, { message: "Số điện thoại không hợp lệ" }),

  dateOfBirth: z.string().optional(),

  profileImageUrl: z.string().optional(),
});

export type { User, Role };
