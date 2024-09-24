"use client";
import { getVariationOptionsByProductId } from "@/services/productService";
import {
  Configuration,
  Option,
  Product,
  ProductItem,
  Variation,
} from "@/types/product";
import { Button, Input } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import formatPrice from "@/utils/priceFormatter";
import { notFound, useRouter } from "next/navigation";
import slugify from "@/utils/slugConverter";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

interface Props {
  product: Product;
  productItem?: ProductItem;
}

interface SelectedOptions {
  [key: string]: string;
}

const ProductDetail: React.FC<Props> = ({ product, productItem }) => {
  console.log("rendering product detail");

  const router = useRouter();
  const [quantity, setQuantity] = useState<string>("1");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const { isPending, error, data } = useQuery({
    queryKey: ["variationOptions", product.id],
    queryFn: () => getVariationOptionsByProductId(product.id),
  });

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

  const optionNames = useMemo(
    () =>
      variations
        .map((variation) => variation.name)
        .filter((value, index, self) => self.indexOf(value) === index),
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

  useEffect(() => {
    const initialOptions: SelectedOptions = {};

    if (!productItem) return;

    productItem.configurations.forEach((config: Configuration) => {
      initialOptions[config.variationOption.name] =
        config.variationOption.value;
    });

    setSelectedOptions(initialOptions);
  }, [productItem]);

  useEffect(() => {
    if (Object.keys(selectedOptions).length === 0) return;

    const isAllOptionsSelected = optionNames.every(
      (name) => selectedOptions[name]
    );

    if (isAllOptionsSelected) {
      const slug = slugify(Object.values(selectedOptions).join(" "));

      router.replace(`/${product.parentCategory}/${product.slug}/${slug}`);
    }
  }, [
    optionNames,
    product.parentCategory,
    product.slug,
    router,
    selectedOptions,
  ]);

  const handleOptionSelect = useCallback(
    (name: string, value: string) => {
      if (selectedOptions[name] === value) return;

      setSelectedOptions((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setSelectedOptions, selectedOptions]
  );

  const image = productItem ? productItem.imageUrl : product.images[0].url;
  const price = productItem ? productItem.price : product.lowestPrice;
  const quantityInStock = productItem ? productItem.quantity : 0;

  if (isPending) return <div>Loading...</div>;

  if (error) {
    console.log("Error fetching product items: ", error);
    return <div>Error fetching product items</div>;
  }

  const quantityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      return setQuantity("");
    }

    const value = parseInt(e.target.value);

    if (value > quantityInStock) {
      return setQuantity(quantityInStock.toString());
    } else {
      return setQuantity(value.toString());
    }
  };

  const changeQuantityHandler = (action: string) => {
    if (action === "increase") {
      setQuantity((prev) => {
        const value = parseInt(prev) + 1;
        if (value > quantityInStock) return prev;
        return value.toString();
      });
    }

    if (action === "decrease") {
      setQuantity((prev) => {
        const value = parseInt(prev) - 1;
        if (value < 1) return prev;
        return value.toString();
      });
    }
  };

  return (
    <div className="flex flex-wrap mb-[50px] mx-auto w-[980px]">
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
        <div className="min-h-20">
          {productItem ? (
            <h1 className="text-3xl font-semibold">{productItem.sku}</h1>
          ) : (
            <h1 className="text-4xl font-semibold">{product.name}</h1>
          )}
        </div>
        <div className="mt-6">
          {colors && (
            <>
              <div className="font-semibold">
                Màu {selectedOptions.Màu && ` - ${selectedOptions.Màu}`}
              </div>
              <ul className="flex gap-4 pt-[18px]">
                {colors.map((color) => (
                  <li
                    key={color.id}
                    className={`rounded-full cursor-pointer border-2  ${
                      selectedOptions.Màu === color.value && "border-[#0071e3]"
                    }`}
                    onClick={() => handleOptionSelect("Màu", color.value)}
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
                <div className="mt-6 font-semibold">{variation.name}</div>
                <ul className="flex gap-8 pt-[18px]">
                  {variation.options.map((option) => (
                    <li
                      key={option.id}
                      className={`rounded-lg p-2 cursor-pointer border-2 ${
                        selectedOptions[variation.name] === option.value &&
                        "border-[#0071e3]"
                      }
                      `}
                      onClick={() =>
                        handleOptionSelect(variation.name, option.value)
                      }
                    >
                      {option.value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        <div className="my-6">
          <span className="text-xl leading-6 font-semibold">
            {formatPrice(price)}đ
          </span>
        </div>
        <div className="flex mb-7 gap-8">
          <div className="flex border-2 items-center justify-center space-x-2 rounded-full p-2 w-32 bg-white text-[#222222] shadow-[0_10px_65px_-10px_rgba(0,0,0,0.25)]">
            <button
              className="text-gray-500 font-bold text-xl hover:opacity-75"
              onClick={() => changeQuantityHandler("decrease")}
            >
              <MinusIcon color="#000" />
            </button>
            <input
              type="number"
              id="number-input"
              pattern="[0-9]+"
              className="text-center w-12 outline-none bg-transparent"
              value={quantity}
              onChange={quantityChangeHandler}
            />
            <button
              className="text-gray-500 font-bold text-xl hover:opacity-75"
              onClick={() => changeQuantityHandler("increase")}
            >
              <PlusIcon color="#000" />
            </button>
          </div>

          <div className="flex gap-2 items-center text-gray-500">
            <span>{quantityInStock}</span>
            <p>sản phẩm có sẵn</p>
          </div>
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
