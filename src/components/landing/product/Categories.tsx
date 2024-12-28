"use client";
import { Category } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/productService";
import Link from "next/link";
import Image from "next/image";
import { CategoryCardSkeleton } from "../../ui/custom/custom-skeletons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

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

  return (
    <div className="w-full pb-[62px] inline-flex pt-3 align-top justify-evenly">
      {categories.map((category: Category) =>
        category.urlKey === "mac" ? (
          <DropdownMenu key={category.id}>
            <DropdownMenuTrigger asChild>
              <Link
                href={`/store/${category.urlKey}`}
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
                <p className="block font-semibold text-center text-primaryText hover:underline">
                  {category.name}
                </p>
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuItem className="hover:opacity-70">
                <Link href={`/store/macbook-air`}>MacBook Air</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:opacity-70">
                <Link href={`/store/macbook-pro`}>MacBook Pro</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={`/store/${category.urlKey}`}
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
            <p className="block font-semibold text-center text-primaryText hover:underline">
              {category.name}
            </p>
          </Link>
        )
      )}
    </div>
  );
};

export default Categories;
