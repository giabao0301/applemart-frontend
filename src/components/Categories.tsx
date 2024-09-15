"use client";
import { Category } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/productService";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) {
    console.log("Error fetching categories: ", isError);
    return <div>Error fetching categories</div>;
  }

  const categories = data.filter(
    (category: Category) => category.parentCategory == null
  );

  console.log(categories);

  return (
    <div className="w-full pb-[62px] inline-flex pt-3 align-top justify-between">
      {categories.map((category: Category) => (
        <div className="flex flex-col gap-3" key={category.id}>
          <Image
            className="block mx-auto my-0 w-auto h-auto"
            src={category.thumbnailUrl}
            width={78}
            height={120}
            alt=""
          />
          <Link
            href={`/${category.urlKey}`}
            className="block text-sm font-semibold text-center text-primary hover:underline"
          >
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
