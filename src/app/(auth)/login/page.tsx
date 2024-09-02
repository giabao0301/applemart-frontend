"use client";
import { useState, useMemo, use, useEffect } from "react";
import { Button, Input, Link, Spinner } from "@nextui-org/react";
import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.replace("/", { scroll: false });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("logging in...");

    mutation.mutate(data);
  };

  return (
    <form className="mt-24" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl text-center font-bold pt-8">Đăng nhập</h1>
      <div className="max-w-[1200px] m-auto w-4/5 pt-8 pb-5 px-0 border-b border-solid border-[#e7e7e8]">
        <div className="flex flex-col justify-around items-center max-w-[460px] mx-auto gap-6 mb-4">
          <Input
            isRequired
            isClearable
            type="text"
            label="Email / Số điện thoại / Tên đăng nhập"
            variant="bordered"
            className="max-w-xs"
            {...register("identifier")}
            isInvalid={errors.identifier ? true : false}
            errorMessage={errors.identifier?.message}
          />
          <Input
            isRequired
            label="Mật khẩu"
            variant="bordered"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
            {...register("password")}
            isInvalid={errors.password ? true : false}
            errorMessage={errors.password?.message}
          />
        </div>

        <div className="text-center">
          Chưa có tài khoản?
          <Link href="/signup" className="text-[#0071e3] cursor-pointer ml-2">
            Đăng ký
          </Link>
        </div>
      </div>
      <div className="min-h-10 max-w-full m-auto text-center mt-4">
        <Button
          type="submit"
          radius="full"
          className="bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-[18px] py-1 px-[15px] focus:outline-none"
        >
          {mutation.isPending ? (
            <Spinner color="white" size="sm" />
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </div>
    </form>
  );
}
