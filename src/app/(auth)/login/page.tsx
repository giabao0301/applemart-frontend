"use client";
import { useState, useMemo } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";

export default function Login() {
  const [value, setValue] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <form className="mt-24">
      <h1 className="text-3xl text-center font-bold pt-8">Đăng nhập</h1>
      <div className="max-w-[1200px] m-auto w-4/5 pt-8 pb-5 px-0 border-b border-solid border-[#e7e7e8]">
        <div className="flex flex-col justify-around items-center max-w-[460px] mx-auto gap-6 mb-4">
          <Input
            isRequired
            type="email"
            label="Email / Số điện thoại / Tên đăng nhập"
            variant="bordered"
            isInvalid={isInvalid}
            errorMessage="Vui lòng nhập tên đăng nhập hợp lệ."
            className="max-w-xs"
            value={value}
            onValueChange={setValue}
          />
          <Input
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
          radius="full"
          className="bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-[18px] py-1 px-[15px] focus:outline-none"
        >
          Đăng nhập
        </Button>
      </div>
    </form>
  );
}
