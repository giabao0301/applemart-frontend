"use client";
import {
  getProductItemsByProductSlug,
  getVariationOptionsByProductId,
} from "@/services/productService";
import { Option, Product, Variation } from "@/types/product";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo } from "react";
import formatPrice from "@/utils/priceFormatter";
import slugify from "@/utils/slugConverter";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  product: Product;
}
const queryKeyMap: Record<string, string> = {
  Màu: "color",
  RAM: "ram",
  "Ổ cứng": "ssd",
  "Dung lượng lưu trữ": "storage",
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedOptions = Object.fromEntries(searchParams.entries());

  const displayOptions = Object.keys(selectedOptions).reduce((acc, key) => {
    const decodedKey = decodeURIComponent(key);
    const friendlyKey = queryKeyMap[decodedKey] || decodedKey;
    const decodedValue = decodeURIComponent(selectedOptions[key]);
    acc[friendlyKey] = decodedValue;
    return acc;
  }, {} as Record<string, string>);

  const { isPending, error, data } = useQuery({
    queryKey: ["variationOptions", product.id],
    queryFn: () => getVariationOptionsByProductId(product.id),
  });

  const productItemsQuery = useQuery({
    queryKey: ["productItems", product.slug],
    queryFn: () => getProductItemsByProductSlug(product.slug),
  });

  const productItems = useMemo(
    () => productItemsQuery.data || [],
    [productItemsQuery.data]
  );

  const variations = useMemo(() => data || [], [data]);

  const colors = useMemo(
    () =>
      variations
        .filter((variation) => variation.name === "Màu")
        .filter(
          (variation, index, self) =>
            self.findIndex((v) => v.value === variation.value) === index
        ),
    [variations]
  );

  const options = useMemo(
    () =>
      variations
        .filter((variation) => variation.name !== "Màu")
        .filter(
          (variation, index, self) =>
            self.findIndex((v) => v.value === variation.value) === index
        ),
    [variations]
  );

  const groupedVariations = useMemo(() => {
    return options.reduce((acc: Variation[], curr: Option) => {
      const existing = acc.find((item) => item.name === curr.name);
      if (existing) {
        existing.options.push(curr);
      } else {
        acc.push({ id: curr.id, name: curr.name, options: [curr] });
      }
      return acc;
    }, []);
  }, [options]);

  const productNameWithSelectedOptions = useMemo(() => {
    let productName = product.name;

    for (const value of Object.values(displayOptions)) {
      productName += ` ${value}`;
    }

    return productName;
  }, [product.name, displayOptions]);

  const selectedProductItem = useMemo(() => {
    const slug = slugify(productNameWithSelectedOptions);
    return productItems.find((item) => item.slug === slug);
  }, [productNameWithSelectedOptions, productItems]);

  const updateQueryParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const friendlyKey = Object.keys(queryKeyMap).find(
      (key) => queryKeyMap[key] === name
    );
    params.set(friendlyKey || name, value);
    router.push(`?${params.toString()}`);
  };

  const image = selectedProductItem
    ? selectedProductItem.imageUrl
    : product.images[0].url;
  const price = selectedProductItem
    ? selectedProductItem.price
    : product.lowestPrice;

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error fetching product items</div>;

  if (productItemsQuery.isLoading) return <div>Loading...</div>;

  if (productItemsQuery.error) return <div>Error fetching product items</div>;

  return (
    <div className="flex flex-wrap mb-[50px] mx-auto w-[912px]">
      <div className="basis-[45.83333%] max-w-[45.83333%] mr-[8.33333%]">
        <div className="w-full h-auto">
          <Image
            className="w-auto h-auto"
            src={image}
            alt=""
            width={514}
            height={477}
            quality={100}
            unoptimized={true}
            priority
          />
          <ul className="flex justify-between">
            <li>
              <Image
                className="w-auto h-auto"
                src={image}
                alt=""
                width={67}
                height={67}
                quality={100}
                unoptimized={true}
              />
            </li>
            {product.images.slice(1).map((image) => (
              <li key={image.id}>
                <Image
                  className="w-auto h-auto"
                  src={image.url}
                  alt=""
                  width={67}
                  height={67}
                  quality={100}
                  unoptimized={true}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-between basis-[45.83333%] max-w-[45.83333%]">
        <div className="min-h-28">
          {selectedProductItem ? (
            <h1 className="text-3xl font-semibold">
              {selectedProductItem.sku}
            </h1>
          ) : (
            <h1 className="text-4xl font-semibold">{product.name}</h1>
          )}
        </div>
        <div className="mt-8">
          {colors && (
            <>
              <div className="font-semibold">
                Màu {selectedOptions.Màu && ` - ${selectedOptions.Màu}`}
              </div>
              <ul className="flex gap-4 pt-[18px]">
                {colors.map((color) => (
                  <li
                    key={color.id}
                    className={`rounded-full cursor-pointer ${
                      selectedOptions.Màu === color.value && "border-2"
                    } border-[#0071e3]`}
                    onClick={() => updateQueryParams("Màu", color.value)}
                  >
                    <Image
                      width={30}
                      height={30}
                      src={color.imageUrl}
                      alt=""
                      className="p-1 rounded-full"
                    />
                  </li>
                ))}
              </ul>
            </>
          )}

          {groupedVariations &&
            groupedVariations.map((variation) => (
              <div key={variation.id}>
                <div className="mt-8 font-semibold">{variation.name}</div>
                <ul className="flex gap-8 pt-[18px]">
                  {variation.options.map((option) => (
                    <li
                      key={option.id}
                      className={`rounded-lg p-2 cursor-pointer ${
                        selectedOptions[variation.name] === option.value &&
                        "border-2"
                      } border-[#0071e3]`}
                      onClick={() =>
                        updateQueryParams(variation.name, option.value)
                      }
                    >
                      {option.value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        <div className="my-8">
          <span className="text-xl leading-6 font-semibold">
            {formatPrice(price)}đ
          </span>
        </div>
        <Button
          type="submit"
          radius="full"
          className="w-3/4 bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-lg py-1 px-[15px] focus:outline-none"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
