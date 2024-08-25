import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ProductVariation, ProductVariationOption } from "@/types/product";
import { useProductDetail } from "@/hooks/useProductDetail";

type ProductImage = {
  id: number;
  imagePath: string;
};

type ProductColor = {
  id: number;
  value: string;
  image: string;
};

const ProductDetail = () => {
  const {
    selectedColor,
    selectedRam,
    selectedSsd,
    selectedQuantity,
  } = useProductDetail();

  console.log(selectedColor, selectedRam, selectedSsd, selectedQuantity);

  const location = useLocation();

  const product = location.state?.product;
  const colors = location.state?.colors;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [colors]);

  console.log(colors);

  return (
    <div className="flex flex-wrap mt-[94px] mb-[50px] mx-auto w-[980px]">
      <div className="basis-7/12 max-w-[58.33333%] mr-[8.33333%]">
        <div className="w-full h-auto">
          <img src={product.imageURLs[0].imagePath} alt="" />
          <ul className="flex justify-between">
            {product.imageURLs.map((item: ProductImage) => (
              <li key={item.id}>
                <img src={item.imagePath} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="basis-1/3 max-w-[33.33333%]">
        <h1 className="text-4xl font-semibold">{product.name}</h1>
        <div className="mt-8">
          <div className="text-xl">Màu - </div>
          <ul className="flex gap-4 pt-[18px]">
            {colors.map((color: ProductColor) => (
              <li
              // key={color.id}
              // className={`rounded-full cursor-pointer ${
              //   active.color === color.id && "border-2"
              // } border-[#0071e3]`}
              // onClick={() => setActive({ color: color.id })}
              >
                <img
                  width={32}
                  height={32}
                  src={color.image}
                  alt=""
                  className="p-1 rounded-full"
                />
              </li>
            ))}
          </ul>
          {/* Slice(1) to skip the color variation */}
          {product.variations.slice(1).map((variation: ProductVariation) => (
            <div key={variation.id}>
              <div className="text-xl mt-8">
                {variation.name.toLocaleUpperCase()}
              </div>
              <ul className="flex gap-8 pt-[18px]">
                {variation.variationOptions.map(
                  (option: ProductVariationOption) => (
                    <li
                      key={option.id}
                      // className={`rounded-lg p-2 cursor-pointer text-lg ${
                      //   option.isActive && "border-2"
                      // } border-[#0071e3]`}
                    >
                      {option.value}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="pb-4 mt-12">
          <span className="text-2xl leading-6">1.429.000đ</span>
        </div>
        <button className="w-full tracking-wider mt-28 text-[18px] py-1 px-[15px] inline-block bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white rounded hover:opacity-80">
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
