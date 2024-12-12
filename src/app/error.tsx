"use client";
import { getErrorMessage } from "@/lib/exceptions";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full text-center">
      <h1 className="w-[501px] text-5xl mt-24 mx-auto mb-12">
        {/* {getErrorMessage(error)} */}
        Đã xảy ra lỗi
      </h1>
      <Link href="/">
        <Button
          onClick={() => reset()}
          radius="full"
          className="w-50 bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-lg py-6 px-8 focus:outline-none"
        >
          Quay lại trang chủ
        </Button>
      </Link>
    </div>
  );
}
