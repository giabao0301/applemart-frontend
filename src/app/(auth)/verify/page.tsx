"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "@/types/error";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Suspense } from "react";

type ConfirmEmailRequest = {
  otp: string;
};

const ConfirmTokenSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function VerifyPage() {
  const router = useRouter();
  const { confirmRegistrationEmail, confirmPasswordResetEmail } = useAuth();

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const mutation = useMutation({
    mutationFn: type
      ? (data: ConfirmEmailRequest) => confirmPasswordResetEmail(data.otp)
      : (data: ConfirmEmailRequest) => confirmRegistrationEmail(data.otp),
    onSuccess: (data) => {
      toast({
        title: "Xác nhận email thành công! 🎉",
        description: "Email của bạn đã được xác nhận.",
      });

      router.replace(data, { scroll: true });
    },
    onError: (error: AxiosError) => {
      if ((error.response?.data as ApiError).message === "Token not found") {
        toast({
          title: "Uh oh! 😕",
          description: "Mã OTP không hợp lệ. Vui lòng thử lại.",
        });
        return;
      }
    },
  });

  const form = useForm<ConfirmEmailRequest>({
    resolver: zodResolver(ConfirmTokenSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: ConfirmEmailRequest) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 mx-auto max-w-full min-h-screen"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-4">
              <FormLabel className="text-xl">Xác thực Email</FormLabel>
              <FormDescription className="text-md">
                Vui lòng nhập mã OTP gồm 6 chữ số được gửi đến email của bạn.
              </FormDescription>
              <FormControl>
                <div className="bg-slate-200 rounded-lg">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
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
              "Xác nhận"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function VerificationPage() {
  return (
    <Suspense>
      <VerifyPage />
    </Suspense>
  );
}
