"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/hooks/use-toast";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "@/types/error";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PasswordResetRequest } from "@/types/form";
import { ResetPasswordSchema } from "@/types/auth";

const Page = () => {
  const router = useRouter();
  const { requestPasswordReset: resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetRequest>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: PasswordResetRequest) => resetPassword(data),
    onSuccess: () => {
      router.replace(`/verify?type=reset-password`, { scroll: true });
      toast({
        title: "Đã gửi yêu cầu xác thực OTP",
        description: "Kiểm tra email của bạn để nhận mã OTP.",
      });
    },
    onError: (error: AxiosError) => {
      if ((error.response?.data as ApiError).status === 404) {
        toast({
          title: "Không thể gửi mã xác thực 😕",
          description: "Email không tồn tại",
        });
      }
    },
  });

  const onSubmit = async (data: PasswordResetRequest) => {
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
        isClearable
        type="text"
        label="Email"
        variant="bordered"
        className="max-w-xs"
        {...register("email")}
        isInvalid={errors.email ? true : false}
        errorMessage={errors.email?.message}
      />

      <div className="min-h-10 max-w-full m-auto text-center mt-4">
        <Button
          type="submit"
          radius="full"
          className="bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-[18px] py-1 px-[15px] focus:outline-none"
        >
          {mutation.isPending ? (
            <Spinner color="white" size="sm" />
          ) : (
            "Gửi mã OTP"
          )}
        </Button>
      </div>
    </form>
  );
};

export default Page;
