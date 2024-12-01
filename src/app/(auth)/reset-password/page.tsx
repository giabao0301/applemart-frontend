"use client";
import { PasswordResetFormData } from "@/types/form";
import { NewPasswordSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { logout } from "@/services/authService";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ApiError } from "@/types/error";
import { useAuth } from "@/context/AuthContext";

function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const email = useSearchParams().get("email");
  const token = useSearchParams().get("token");

  console.log(email, token);

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
      resetPassword(email as string, data, token as string),
    onSuccess: () => {
      toast({
        title: "Thành công ✅",
        description: "Mật khẩu đã được đặt lại",
      });
      logout();
      router.replace("/login");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      if ((error.response?.data as ApiError).message === "Token not found") {
        toast({
          title: "Uh oh! 😕",
          description: "Token không hợp lệ",
        });
      } else if (
        (error.response?.data as ApiError).message ===
        "New password and current password must be different"
      ) {
        toast({
          title: "Uh oh! 😕",
          description: "Mật khẩu mới phải khác mật khẩu hiện tại",
        });
      } else if (
        (error.response?.data as ApiError).message ===
        "Confirm password does not match"
      ) {
        toast({
          title: "Uh oh! 😕",
          description: "Mật khẩu xác nhận không khớp",
        });
      }
    },
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    console.log(data);

    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-2/3 space-y-6 mx-auto max-w-full min-h-screen flex flex-col items-center"
    >
      <h1 className="text-2xl font-semibold text-center">Đặt lại mật khẩu</h1>
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
          {mutation.isPending ? <Spinner color="white" size="sm" /> : "Đặt lại"}
        </Button>
      </div>
    </form>
  );
}

export default function PasswordResetPage() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}
