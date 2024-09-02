import { FieldError, UseFormRegister } from "react-hook-form";
import { InputProps } from "@nextui-org/input";

export type LoginFormData = {
  identifier: string;
  password: string;
};

export type SignupFormData = {
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};
