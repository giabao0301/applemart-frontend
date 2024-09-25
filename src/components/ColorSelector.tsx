"use client";
import { Option, Variation } from "@/types/product";
import Image from "next/image";
import React from "react";

interface ColorSelectorProps {
  colors: Option[];
  selectedColor: string;
  handleOptionSelect: (type: string, value: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = React.memo(
  ({ colors, selectedColor, handleOptionSelect }) => (
    <ul className="flex gap-4 pt-[18px]">
      {colors.map((color) => (
        <li
          key={color.id}
          className={`rounded-full cursor-pointer border-2  ${
            selectedColor === color.value && "border-[#0071e3]"
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
  )
);

ColorSelector.displayName = "ColorSelector";

export default ColorSelector;
