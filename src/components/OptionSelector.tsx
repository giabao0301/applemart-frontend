import { Variation } from "@/types/product";
import React from "react";

interface OptionSelectorProps {
  variations: Variation[];
  selectedOptions: { [key: string]: string };
  handleOptionSelect: (variationName: string, optionValue: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  variations,
  selectedOptions,
  handleOptionSelect,
}) => (
  <>
    {variations.map((variation) => (
      <div key={variation.id}>
        <div className="mt-6 font-semibold">{variation.name}</div>
        <ul className="flex gap-8 pt-[18px]">
          {variation.options.map((option) => (
            <li
              key={option.id}
              className={`rounded-lg p-2 cursor-pointer bg-white shadow-[0_10px_65px_-10px_rgba(0,0,0,0.25)] border-2 ${
                selectedOptions[variation.name] === option.value &&
                "border-[#0071e3]"
              }`}
              onClick={() => handleOptionSelect(variation.name, option.value)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);

OptionSelector.displayName = "OptionSelector";

export default React.memo(OptionSelector);
