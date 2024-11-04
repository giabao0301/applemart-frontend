"use client";
import { Category } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/productService";
import Link from "next/link";
import Image from "next/image";
import { CategoryCardSkeleton } from "./Skeleton";

const Categories = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isPending)
    return (
      <div className="w-full pb-[62px] inline-flex pt-3 align-top justify-evenly">
        {Array.from({ length: 6 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    );

  if (error) throw new Error(error.message);

  const categories = data.filter(
    (category: Category) => category.parentCategory == null
  );

  console.log(categories);

  return (
    <div className="w-full pb-[62px] inline-flex pt-3 align-top justify-evenly">
      {categories.map((category: Category) => (
        <Link
          href={`/${category.urlKey}`}
          className="flex flex-col gap-3"
          key={category.id}
        >
          <Image
            className="mx-auto my-0"
            src={category.thumbnailUrl}
            width={120}
            height={78}
            alt=""
            quality={100}
            unoptimized={true}
            loading="lazy"
          />
          <p className="block font-semibold text-center text-primary hover:underline">
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
