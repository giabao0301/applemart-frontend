"use client";
import { getProductItemsBySlug } from "@/services/productService";
import { Option, Product, ProductItem, Variation } from "@/types/product";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import formatPrice from "@/utils/priceFormatter";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

interface SelectedOptions {
  [key: string]: string | number;
}

const ProductDetail: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [sku, setSku] = useState<string>(product.name);
  const [productItem, setProductItem] = useState<ProductItem>();

  const { isPending, error, data } = useQuery({
    queryKey: ["productItems", product.slug],
    queryFn: () => getProductItemsBySlug(product.slug),
  });

  const productItems = useMemo(() => data || [], [data]);

  const variations = useMemo(
    () =>
      productItems
        .map((item) => item.configurations)
        .flat()
        .map((config) => config.variationOption),
    [productItems]
  );

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

  const optionNames = useMemo(
    () =>
      variations
        .map((variation) => variation.name)
        .filter((value, index, self) => self.indexOf(value) === index),
    [variations]
  );

  useEffect(() => {
    const initialOptions: SelectedOptions = {};

    for (const option of optionNames) {
      if (option === "Màu" && colors.length > 0) {
        initialOptions[option] = colors[0].value;
      } else {
        groupedVariations.forEach((variation) => {
          if (variation.name === option) {
            initialOptions[option] = variation.options[0].value;
          }
        });
      }
    }

    setSelectedOptions(initialOptions);
  }, [optionNames, colors, groupedVariations]);

  useEffect(() => {
    let newSku = product.name;
    for (const key of Object.keys(selectedOptions)) {
      if (key === "Ổ cứng" || key === "Dung lượng lưu trữ") {
        newSku += `/${selectedOptions[key]}`;
      } else {
        newSku += ` ${selectedOptions[key]}`;
      }
    }
    setSku(newSku);
  }, [selectedOptions, product.name]);

  useEffect(() => {
    const productItem = productItems.find((item) => item.sku === sku);
    setProductItem(productItem);
  }, [sku, productItems]);

  const image = productItem ? productItem.image : product.images[0].url;
  const price = productItem ? productItem.price : product.lowestPrice;

  if (isPending) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <div className="flex flex-wrap mb-[50px] mx-auto w-[882px]">
      <div className="basis-7/12 max-w-[58.33333%] mr-[8.33333%]">
        <div className="w-full h-auto">
          <Image
            className="w-auto h-auto"
            src={image}
            alt=""
            width={514}
            height={477}
          />
          <ul className="flex justify-between">
            <li>
              <Image
                className="w-auto h-auto"
                src={image}
                alt=""
                width={67}
                height={67}
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
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-between basis-1/3 max-w-[33.33333%]">
        <h1 className="text-3xl font-semibold">{sku}</h1>
        <div className="mt-8">
          {colors && (
            <>
              <div className="font-semibold">
                Màu {` - ${selectedOptions.Màu}`}
              </div>
              <ul className="flex gap-4 pt-[18px]">
                {colors.map((color) => (
                  <li
                    key={color.id}
                    className={`rounded-full cursor-pointer ${
                      selectedOptions.Màu === color.value && "border-2"
                    } border-[#0071e3]`}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        Màu: color.value,
                      }))
                    }
                  >
                    <Image
                      width={28}
                      height={28}
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
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [variation.name]: option.value,
                        }))
                      }
                    >
                      {option.value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        <div className="pb-4 mt-12">
          <span className="text-xl leading-6 font-semibold">
            {formatPrice(price)}đ
          </span>
        </div>
        <Button
          type="submit"
          radius="full"
          className="bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-lg py-1 px-[15px] focus:outline-none"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
