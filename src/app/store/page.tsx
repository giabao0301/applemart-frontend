"use client";
import ProductList from "@/components/product/ProductList";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();
  const page = params.get("page") || "1";

  return (
    <div className="my-0">
      <ProductList page={page} />
    </div>
  );
};

export default Page;
