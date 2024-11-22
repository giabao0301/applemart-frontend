"use client";
import { getProductItemsByProductId } from "@/services/productService";
import {
  Configuration,
  Option,
  Product,
  ProductItem,
  Variation,
} from "@/types/product";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import formatPrice from "@/utils/priceFormatter";
import { useRouter } from "next/navigation";
import slugify from "@/utils/slugConverter";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import ColorSelector from "./ColorSelector";
import OptionSelector from "./OptionSelector";
import ImageCarousel from "./ImageCarousel";
import { ShoppingCartIcon } from "lucide-react";
import { addCartItem } from "@/services/cartService";
import { useAuth } from "@/context/AuthContext";
import { CartItemRequest } from "@/types/cart";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

interface Props {
  product: Product;
  slug?: string;
}

interface SelectedOptions {
  [key: string]: string;
}

const order = ["Màu", "RAM", "Ổ cứng"];

const ProductDetail: React.FC<Props> = ({ product, slug }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<string>("1");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const { user, isAuthenticated } = useAuth();

  const productItemsQuery = useQuery({
    queryKey: ["productItems", product.id],
    queryFn: () => getProductItemsByProductId(product.id),
    enabled: !!product.id,
    staleTime: 0,
  });

  const cartQuery = useMutation({
    mutationFn: ({ userId, data }: { userId: number; data: CartItemRequest }) =>
      addCartItem(userId, data),
    onSuccess: () => {
      toast({
        title: "Sản phẩm đã được thêm vào giỏ hàng 🎉",
        description: "Bạn có thể xem giỏ hàng bất cứ lúc nào",
        action: (
          <ToastAction altText="Cart" onClick={() => router.push("/cart")}>
            Giỏ hàng
          </ToastAction>
        ),
      });
    },
  });

  const productItems = useMemo(
    () => productItemsQuery.data || [],
    [productItemsQuery.data]
  );

  const productItem = useMemo(
    () => productItems.find((item: ProductItem) => item.slug === slug),
    [productItems, slug]
  );

  const variations = useMemo(
    () =>
      productItems
        .map((item: ProductItem) =>
          item.configurations.map((config) => config.variationOption)
        )
        .flat() || [],
    [productItems]
  );

  const colors = useMemo(
    () =>
      variations.filter(
        (variation, index, self) =>
          variation.name === "Màu" &&
          self.findIndex((v) => v.value === variation.value) === index
      ),
    [variations]
  );

  const options = useMemo(
    () =>
      variations.filter(
        (variation, index, self) =>
          variation.name !== "Màu" &&
          self.findIndex((v) => v.value === variation.value) === index
      ),
    [variations]
  );

  const optionNames = useMemo(
    () => [...new Set(variations.map((variation) => variation.name))],
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
    if (!productItem) return;
    const initialOptions: SelectedOptions = {};
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
      const sortedOptions: { [key: string]: string } = {};
      order.forEach((key) => {
        if (key in selectedOptions) {
          sortedOptions[key] = selectedOptions[key];
        }
      });
      const slug = slugify(Object.values(sortedOptions).join(" "));
      router.replace(
        `/store/${product.parentCategory}/${product.slug}/${slug}`
      );
    }
  }, [
    optionNames,
    product.parentCategory,
    product.slug,
    router,
    selectedOptions,
  ]);

  const handleOptionSelect = useCallback((name: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

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

  const addCartItemHandler = () => {
    const isAllOptionsSelected = optionNames.every(
      (name) => selectedOptions[name]
    );

    if (!isAllOptionsSelected) {
      toast({
        title: "Không thể thêm sản phẩm vào giỏ hàng ❌",
        description: "Vui lòng chọn đầy đủ các tùy chọn của sản phẩm",
      });
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    cartQuery.mutate({
      userId: user!.id,
      data: {
        productItemId: productItem!.id,
        quantity: parseInt(quantity),
      },
    });
  };

  const image = productItem ? productItem.imageUrl : product.images[0].url;
  const price = productItem ? productItem.price : product.lowestPrice;
  const quantityInStock = productItem ? productItem.quantityInStock : 0;

  const images = [];
  images.push(image);
  product.images.slice(1).forEach((img) => images.push(img.url));

  if (productItemsQuery.isPending) return <div>Loading...</div>;
  if (productItemsQuery.error) return <div>Error fetching product items</div>;

  return (
    <div className="flex flex-wrap mb-[50px] mx-auto w-[980px]">
      <div className="basis-[45.83333%] max-w-[45.83333%] mr-[8.33333%]">
        <ImageCarousel images={images} />
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
              priority
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
                priority
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-between basis-[45.83333%] max-w-[45.83333%]">
        <div className="min-h-20">
          {productItem ? (
            <h1 className="text-3xl font-semibold">{productItem.name}</h1>
          ) : (
            <h1 className="text-4xl font-semibold">{product.name}</h1>
          )}
        </div>

        <div className="mt-6">
          {colors.length > 0 && (
            <ColorSelector
              colors={colors}
              selectedColor={selectedOptions["Màu"]}
              handleOptionSelect={handleOptionSelect}
            />
          )}

          {groupedVariations.length > 0 && (
            <OptionSelector
              variations={groupedVariations}
              selectedOptions={selectedOptions}
              handleOptionSelect={handleOptionSelect}
            />
          )}
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
              className="text-center w-12 text-lg appearance-none focus:outline-none"
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
        <div className="flex justify-between">
          <Button
            type="button"
            radius="full"
            className="bg-white text-[#0070c9] border-1 border-[#42a1ec] shadow-lg text-lg py-1 px-[15px] focus:outline-none"
            onClick={addCartItemHandler}
          >
            <ShoppingCartIcon size={20} />
            Thêm vào giỏ hàng
          </Button>
          <Button
            type="submit"
            radius="full"
            className="w-1/2 bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-lg py-1 px-[15px] focus:outline-none"
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
