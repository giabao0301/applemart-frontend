"use client";
import { useState, useMemo, use, useEffect } from "react";
import { Button, Checkbox, Input, Link, Spinner } from "@nextui-org/react";
import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { ApiError } from "@/types/error";
import { AxiosError } from "axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Alert } from "@/components/ui/custom/AlertDialog";
import { ToastAction } from "@/components/ui/toast";

export default function Page() {
  const router = useRouter();

  const { login, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router, isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      router.replace("/", { scroll: false });
    },
    onError: (error: AxiosError, variables) => {
      console.log(variables);

      if (
        (error.response?.data as ApiError).message === "Account does not exist"
      ) {
        toast({
          title: "Đăng nhập thất bại 😕",
          description: "Tài khoản không tồn tại",
        });
      } else if (
        (error.response?.data as ApiError).message === "Password is incorrect"
      ) {
        toast({
          title: "Đăng nhập thất bại 😕",
          description: "Mật khẩu không chính xác",
        });
      } else if (
        (error.response?.data as ApiError).message === "Account is not active"
      ) {
        toast({
          title: "Đăng nhập thất bại 😕",
          description: "Tài khoản chưa được xác thực",
          action: (
            <ToastAction
              altText="Send OTP"
              onClick={() => router.push(`/email-verification`)}
            >
              Xác thực ngay
            </ToastAction>
          ),
        });
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("logging in...");
    mutation.mutate(data);
  };

  return (
    <form className="mt-18" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl text-center font-bold pt-8">Đăng nhập</h1>
      <div className="max-w-[320px] m-auto w-4/5 pt-8 pb-5 px-0">
        <div className="flex flex-col justify-around items-center max-w-[460px] mx-auto gap-6 mb-2">
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
        <div className="text-start ml-2">
          <div className="flex justify-between">
            {/* <Checkbox
              isSelected={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              size="sm"
              color="secondary"
            >
              Nhớ mật khẩu
            </Checkbox> */}
            <Link
              href="/recovery"
              className="text-sm text-[#0071e3] cursor-pointer"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        <div className="min-h-10 max-w-full m-auto text-center mt-12">
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
        <div className="text-center my-6">
          Chưa có tài khoản?
          <Link href="/signup" className="text-[#0071e3] cursor-pointer ml-2">
            Đăng ký
          </Link>
        </div>
      </div>

      <h2 className="w-[320px] text-center mx-auto border-b-2 border-[#e7e7e8] leading-[0.1em] my-[10px] mb-[20px] text-sm">
        <span className="bg-white px-2 text-gray-400">HOẶC</span>
      </h2>

      <div className="max-w-[320px] mx-auto my-4 flex justify-between">
        <Button variant="light" className="cursor-pointer">
          <Image
            src={
              "https://res.cloudinary.com/dipiog2a2/image/upload/v1731116642/1024px-Facebook_Logo__282019_29_qt1fcu.png"
            }
            className="w-6 h-6 object-cover"
            alt=""
            width={20}
            height={20}
            quality={100}
            unoptimized={true}
            priority
          />
          <span className="ml-2">Facebook</span>
        </Button>

        <Button
          variant="light"
          onClick={() =>
            (window.location.href =
              "http://localhost:8080/oauth2/authorization/google")
          }
          className="cursor-pointer"
        >
          <Image
            src={
              "https://res.cloudinary.com/dipiog2a2/image/upload/v1731115986/2048px-Google__22G_22_logo.svg_jinqfn.png"
            }
            className="w-6 h-6 object-cover"
            alt=""
            width={20}
            height={20}
            quality={100}
            unoptimized={true}
            priority
          />
          <span className="ml-2">Google</span>
        </Button>
      </div>
    </form>
  );
}
