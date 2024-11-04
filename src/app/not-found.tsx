import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full text-center">
      <h1 className="w-[501px] text-5xl mt-24 mx-auto mb-12">
        Chúng tôi không tìm được trang mà bạn đang tìm.
      </h1>
      <Link href="/">
        <Button
          type="submit"
          radius="full"
          className="w-50 bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-lg py-6 px-8 focus:outline-none"
        >
          Quay lại trang chủ
        </Button>
      </Link>
    </div>
  );
}
