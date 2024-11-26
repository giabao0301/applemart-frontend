"use client";
import { ChangePasswordFormData } from "@/types/form";
import { ChangePasswordSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword, logout } from "@/services/authService";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ApiError } from "@/types/error";

const Page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: "Đã lưu ✅",
        description:
          "Mật khẩu của bạn đã được thay đổi, vui lòng đăng nhập lại",
      });
      logout();
      router.replace("/login");
    },
    onError: (error: AxiosError) => {
      if (
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

  const onSubmit = async (data: ChangePasswordFormData) => {
    console.log(data);

    mutation.mutate(data);
  };

  return (
    <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl text-center font-bold pt-8">Đổi mật khẩu</h1>
      <div className="max-w-[1200px] m-auto w-4/5 pt-8 pb-5 px-0 border-b border-solid border-[#e7e7e8]">
        <div className="flex flex-col justify-around items-center max-w-[460px] mx-auto gap-6 mb-4">
          <Input
            isRequired
            label="Mật khẩu hiện tại"
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
            {...register("currentPassword")}
            isInvalid={errors.currentPassword ? true : false}
            errorMessage={errors.currentPassword?.message}
          />
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
        </div>
      </div>
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
