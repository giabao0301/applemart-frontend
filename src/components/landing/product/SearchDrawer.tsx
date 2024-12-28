"use client";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import useDebounce from "@/hooks/useDebounce";
import { getSuggestions } from "@/services/productService";
import slugify from "@/utils/slugConverter";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@nextui-org/drawer";
import { Button, Input, select, useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchDrawer() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 600);

  const {
    data: suggestions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchProduct", debouncedSearchTerm],
    queryFn: () => getSuggestions(debouncedSearchTerm),
    enabled: debouncedSearchTerm !== "",
  });

  const searchHandler = (searchTerm: string) => {
    setSearchTerm("");
    onOpenChange();
    router.push(`/search?keyword=${slugify(searchTerm)}`);
  };

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer text hover:opacity-75">
        <SearchIcon />
      </div>
      <Drawer
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        size="5xl"
        radius="none"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody className="py-10 px-20">
                <Input
                  autoFocus
                  onClear={() => setSearchTerm("")}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !searchTerm) {
                      router.push("/search");
                    }
                    if (e.key === "Enter" && searchTerm) {
                      searchHandler(searchTerm);
                    }
                  }}
                  isClearable
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "shadow-xl",
                      "bg-default-200/50",
                      "dark:bg-default/60",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "dark:hover:bg-default/70",
                      "group-data-[focus=true]:bg-default-200/50",
                      "dark:group-data-[focus=true]:bg-default/60",
                      "!cursor-text",
                    ],
                  }}
                  placeholder="Tìm kiếm sản phẩm"
                  radius="lg"
                  startContent={
                    <SearchIcon className="text-secondaryText/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <div className="h-[216px]">
                  <div className="pl-8 flex flex-col gap-1">
                    {suggestions?.map((suggestion) => (
                      <div
                        onClick={() => searchHandler(suggestion)}
                        className="text-secondaryText hover:text-primaryText cursor-pointer"
                        key={suggestion}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
