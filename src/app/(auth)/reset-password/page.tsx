"use client";
import { PasswordResetFormData } from "@/types/form";
import { ChangePasswordSchema, NewPasswordSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword, logout } from "@/services/authService";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ApiError } from "@/types/error";
import { useAuth } from "@/context/AuthContext";

const Page = () => {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const email = useSearchParams().get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const mutation = useMutation({
    mutationFn: (data: PasswordResetFormData) =>
      resetPassword({
        ...data,
        email: email as string,
      }),
    onSuccess: () => {
      toast({
        title: "Thành công ✅",
        description: "Mật khẩu đã được đặt lại",
      });
      logout();
      router.replace("/login");
    },
    onError: (error: AxiosError) => {
      if (
        (error.response?.data as ApiError).message ===
        "New password and current password must be different"
      ) {
        toast({
          title: "Uh oh! 😕",
          description: "Mật khẩu mới phải khác mật khẩu hiện tại",
        });
      } else if (
        (error.response?.data as ApiError).message ===
        "Current password is incorrect"
      ) {
        toast({
          title: "Uh oh! 😕",
          description: "Mật khẩu hiện tại không chính xác",
        });
      }
    },
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-2/3 space-y-6 mx-auto mt-40 max-w-full min-h-screen bg-white flex flex-col items-center"
    >
      <h1 className="text-2xl font-semibold text-center">Khôi phục mật khẩu</h1>
      <Input
        isRequired
        label="Mật khẩu mới"
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            aria-label="toggle password visibility"
          >
            {isPasswordVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isPasswordVisible ? "text" : "password"}
        className="max-w-xs"
        {...register("newPassword")}
        isInvalid={errors.newPassword ? true : false}
        errorMessage={errors.newPassword?.message}
      />
      <Input
        isRequired
        label="Nhập lại mật khẩu mới"
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            aria-label="toggle password visibility"
          >
            {isConfirmPasswordVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isConfirmPasswordVisible ? "text" : "password"}
        className="max-w-xs"
        {...register("confirmPassword")}
        isInvalid={errors.confirmPassword ? true : false}
        errorMessage={errors.confirmPassword?.message}
      />
      <div className="min-h-10 max-w-full m-auto text-center mt-4">
        <Button
          type="submit"
          radius="full"
          className="bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-[18px] py-1 px-[15px] focus:outline-none"
        >
          {mutation.isPending ? <Spinner color="white" size="sm" /> : "Lưu"}
        </Button>
      </div>
    </form>
  );
};

export default Page;
