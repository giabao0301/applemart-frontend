"use client";
import { getProductsById } from "@/services/productService";
import {
  Configuration,
  Option,
  Product,
  ProductImage,
  ProductItem,
  Variation,
} from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

type GroupedOptions = {
  [key: string]: Option[];
};

const ProductDetail = () => {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const id: number = parseInt(searchParams.get("id")!);

  const productSlug: string = params.slug;

  const { isPending, error, data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductsById(id),
    enabled: !!id,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) {
    console.log("Error fetching product: ", error);
  }

  const product: Product = data?.data;

  console.log(product);

  const colors =
    product.variations.find((variation) => variation.name === "color")
      ?.options || [];

  const variations = product.variations.filter(
    (variation) => variation.name !== "color"
  );

  return (
    <div className="flex flex-wrap mt-[94px] mb-[50px] mx-auto w-[980px]">
      <div className="basis-7/12 max-w-[58.33333%] mr-[8.33333%]">
        <div className="w-full h-auto">
          <Image src={product.imageUrl} alt="" width={571} height={530} />
          {/* <ul className="flex justify-between">
            {products[0].images.map((item: ProductImage) => (
              <li key={item.id}>
                <Image src={item.url} alt="" />
              </li>
            ))}
          </ul> */}
        </div>
      </div>
      <div className="basis-1/3 max-w-[33.33333%]">
        <h1 className="text-4xl font-semibold">{product.name}</h1>
        <div className="mt-8">
          <div className="text-xl">Màu - {}</div>
          <ul className="flex gap-4 pt-[18px]">
            {colors.map((color) => (
              <li
                key={color.id}
                // className={`rounded-full cursor-pointer ${
                //   active.color === color.id && "border-2"
                // } border-[#0071e3]`}
                // onClick={() => setActive({ color: color.id })}
              >
                <Image
                  width={32}
                  height={32}
                  src={color.imageUrl}
                  alt=""
                  className="p-1 rounded-full"
                />
              </li>
            ))}
          </ul>
          {/* Slice(1) to skip the color variation */}
          {variations.map((variation: Variation) => (
            <div key={variation.id}>
              <div className="text-xl mt-8">
                {variation.name.toLocaleUpperCase()}
              </div>
              <ul className="flex gap-8 pt-[18px]">
                {variation.options.map((option) => (
                  <li
                    key={option.id}
                    // className={`rounded-lg p-2 cursor-pointer text-lg ${
                    //   option.isActive && "border-2"
                    // } border-[#0071e3]`}
                  >
                    {option.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pb-4 mt-12">
          <span className="text-2xl leading-6">{product.lowestPrice}</span>
        </div>
        <button className="w-full tracking-wider mt-28 text-[18px] py-1 px-[15px] inline-block bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white rounded hover:opacity-80">
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
