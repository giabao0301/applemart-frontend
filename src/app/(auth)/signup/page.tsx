"use client";
import { useState } from "react";
import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { useForm } from "react-hook-form";
import { SignupFormData } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { InputOTPPattern } from "@/components/InputOTPPattern";
import { AxiosError } from "axios";
import { ApiError } from "@/types/error";
import { toast } from "@/hooks/use-toast";

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.replace("/verify", { scroll: true });
      toast({
        title: "Đã gửi yêu cầu xác thực OTP",
        description: "Kiểm tra email của bạn để nhận mã OTP.",
      });
    },
    onError: (error: AxiosError) => {
      if (
        (error.response?.data as ApiError).message ===
        "Email address already in use"
      ) {
        toast({
          title: "Đăng ký thất bại 😕",
          description: "Email đã được sử dụng",
        });
      } else if (
        (error.response?.data as ApiError).message === "Username already exists"
      ) {
        toast({
          title: "Đăng nhập thất bại 😕",
          description: "Tên đăng nhập đã tồn tại",
        });
      } else {
        toast({
          title: "Đăng ký thất bại 😕",
          description: "Đã xảy ra lỗi",
        });
      }
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log("signing up...");

    mutation.mutate(data);
  };

  return (
    <form className="mt-24" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl text-center font-bold pt-8">Đăng ký</h1>
      <div className="max-w-[1200px] m-auto w-4/5 pt-8 pb-5 px-0 border-b border-solid border-[#e7e7e8]">
        <div className="flex flex-col justify-around items-center max-w-[460px] mx-auto gap-6 mb-4">
          <Input
            isRequired
            isClearable
            type="text"
            label="Tên đăng nhập"
            variant="bordered"
            className="max-w-xs"
            {...register("username")}
            isInvalid={errors.username ? true : false}
            errorMessage={errors.username?.message}
          />
          <Input
            isRequired
            isClearable
            type="text"
            label="Email"
            variant="bordered"
            className="max-w-xs"
            {...register("email")}
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email?.message}
          />
          <Input
            isRequired
            isClearable
            type="text"
            label="Tên đầy đủ"
            variant="bordered"
            className="max-w-xs"
            {...register("fullName")}
            isInvalid={errors.fullName ? true : false}
            errorMessage={errors.fullName?.message}
          />
          <Input
            isRequired
            label="Mật khẩu"
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
            {...register("password")}
            isInvalid={errors.password ? true : false}
            errorMessage={errors.password?.message}
          />
          <Input
            isRequired
            label="Nhập lại mật khẩu"
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

        <div className="text-center">
          Đã có tài khoản?
          <Link href="/login" className="text-[#0071e3] cursor-pointer ml-2">
            Đăng nhập
          </Link>
        </div>
      </div>
      <div className="min-h-10 max-w-full m-auto text-center mt-4">
        <Button
          type="submit"
          radius="full"
          className="bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-[18px] py-1 px-[15px] focus:outline-none"
        >
          {mutation.isPending ? <Spinner color="white" size="sm" /> : "Đăng ký"}
        </Button>
      </div>
    </form>
  );
}
