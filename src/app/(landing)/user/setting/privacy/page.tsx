"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl">Thiết lập riêng tư</h2>
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-lg">Yêu cầu xóa tài khoản</h2>
        <Button
          className="text-lg bg-error text-white"
          onClick={() => router.push("/user/account/delete")}
        >
          Xóa tài khoản
        </Button>
      </div>
    </div>
  );
};

export default Page;
