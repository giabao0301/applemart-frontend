import { Address } from "@/types/user";
import formatPhoneNumber from "@/utils/phoneNumberFormatter";
import { Radio, RadioGroup } from "@nextui-org/react";
import AddressFormModal from "./AddressFormModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDefaultAddress } from "@/services/addressService";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { set } from "zod";

const AddressItem = ({
  isSelected,
  address,
  onSelect,
}: {
  isSelected: boolean;
  address: Address;
  onSelect: () => void;
}) => {
  return (
    <div
      onClick={onSelect}
      className={`flex flex-col gap-2 pt-5 pb-5 mb-4 px-4 ${
        isSelected
          ? "border border-primary"
          : "hover:opacity-70 hover:cursor-pointer border border-gray-300"
      }`}
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2>{address.recipient}</h2>
            <span className="text-sm text-secondaryText border-l-1 border-secondaryText pl-2 ml-2">
              {formatPhoneNumber(address.phone)}
            </span>
          </div>
          <div className="flex gap-4">
            <AddressFormModal header="Cập nhật địa chỉ" data={address} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div>
            <span className="text-secondaryText">{address.address}</span>
          </div>
          <div>
            <span className="text-secondaryText">
              {address.ward}, {address.district}, {address.city}
            </span>
          </div>
        </div>
      </div>
      <div>
        {address.isDeliveryAddress && (
          <span className="text-primary p-1 text-sm border border-primary">
            Mặc định
          </span>
        )}
      </div>
    </div>
  );
};

export default AddressItem;
