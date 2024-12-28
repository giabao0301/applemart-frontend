"use client";
import ProductItemList from "@/components/landing/product/ProductItemList";
import { CustomSelect } from "@/components/ui/custom/CustomSelect";
import { Input } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();

  const keyword = params.get("keyword") || "";
  const page = params.get("page") || "1";
  const sort = params.get("sort") || "";
  const dir = params.get("dir") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";

  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice]);

  const addUrlParamsHandler = (pairs: { key: string; value: string }[]) => {
    const newParams = new URLSearchParams(params);
    for (const pair of pairs) {
      newParams.set(pair.key, pair.value);
      router.push(`/search?${newParams.toString()}`);
    }
  };

  const submitPriceRangeHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(params);
    newParams.set("minPrice", priceRange.min);
    newParams.set("maxPrice", priceRange.max);
    router.push(`/search?${newParams.toString()}`);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-8 items-center">
          <div>Sắp xếp theo</div>
          <button
            className={`px-4 py-2 ${
              sort === "id" ? "text-white bg-primary" : "bg-white"
            }`}
            onClick={() => {
              addUrlParamsHandler([
                { key: "sort", value: "id" },
                { key: "dir", value: "desc" },
              ]);
            }}
          >
            Mới nhất
          </button>
          <CustomSelect
            value="Giá"
            items={["Giá: Thấp đến Cao", "Giá: Cao đến Thấp"]}
            onChange={(value) => {
              addUrlParamsHandler([
                { key: "sort", value: "price" },
                {
                  key: "dir",
                  value: value === "Giá: Thấp đến Cao" ? "asc" : "desc",
                },
              ]);
            }}
          />
        </div>
        <form
          onSubmit={submitPriceRangeHandler}
          className="flex gap-8 items-center"
        >
          <div>Khoảng giá</div>
          <div className="flex gap-4 items-center">
            <Input
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">đ</span>
                </div>
              }
              placeholder="Từ"
              type="number"
              value={priceRange.min}
              validate={(value: string) => {
                if (value && parseInt(value) > 0) {
                  return true;
                }
              }}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
            />
            <div className="text-secondaryText">&mdash;</div>
            <Input
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">đ</span>
                </div>
              }
              placeholder="Đến"
              type="number"
              value={priceRange.max}
              validate={(value: string) => {
                if (value && parseInt(value) > 0) {
                  return true;
                }
              }}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 hover:opacity-80"
          >
            Áp dụng
          </button>
        </form>
      </div>

      <div className="my-8">
        <ProductItemList
          page={page}
          keyword={keyword}
          sort={sort}
          dir={dir}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </>
  );
};

export default Page;
