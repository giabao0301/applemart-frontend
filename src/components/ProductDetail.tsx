"use client";
import {
  getProductItemsByProductName,
  getVariationOptionsByProductId,
} from "@/services/productService";
import {
  Configuration,
  Option,
  Product,
  ProductItem,
  Variation,
} from "@/types/product";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { use, useEffect, useMemo, useState } from "react";
import formatPrice from "@/utils/priceFormatter";
import { useRouter } from "next/navigation";
import slugify from "@/utils/slugConverter";

interface Props {
  decodedSlug: string;
  product: Product;
}

interface SelectedOptions {
  [key: string]: string | number;
}

const ProductDetail: React.FC<Props> = ({ decodedSlug, product }) => {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const { isPending, error, data } = useQuery({
    queryKey: ["variationOptions", product.id],
    queryFn: () => getVariationOptionsByProductId(product.id),
  });

  const productItemsQuery = useQuery({
    queryKey: ["productItems", product.name],
    queryFn: () => getProductItemsByProductName(product.name),
  });

  const productItems = useMemo(
    () => productItemsQuery.data || [],
    [productItemsQuery.data]
  );

  const productItem: ProductItem | undefined = productItems.find(
    (item) => item.slug === decodedSlug
  );
  console.log(productItems);

  console.log(productItem);

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

  useEffect(() => {
    const initialOptions: SelectedOptions = {};

    productItem?.configurations.forEach((config: Configuration) => {
      initialOptions[config.variationOption.name] =
        config.variationOption.value;
    });

    setSelectedOptions(initialOptions);
  }, [productItem?.configurations]);

  useEffect(() => {
    let sku = product.name;
    for (const value of Object.values(selectedOptions)) {
      if (value) sku += ` ${value}`;
    }

    if (sku === product.name) return;

    const slug = slugify(sku);
    router.replace(`/${product.parentCategory}/${product.category}/${slug}`);
  }, [
    selectedOptions,
    productItem?.productName,
    product.parentCategory,
    product.category,
    product.name,
    router,
  ]);

  console.log(selectedOptions);

  const image = productItem ? productItem.imageUrl : product.images[0].url;
  const price = productItem ? productItem.price : product.lowestPrice;

  if (isPending) return <div>Loading...</div>;

  if (error) return;

  if (productItemsQuery.isPending) return <div>Loading...</div>;

  if (productItemsQuery.error) return;

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
          <h1 className="text-3xl font-semibold">{productItem?.sku}</h1>
        </div>
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
                    onClick={() => {
                      if (selectedOptions.Màu === color.value) return;

                      setSelectedOptions((prev) => ({
                        ...prev,
                        Màu: color.value,
                      }));
                    }}
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
