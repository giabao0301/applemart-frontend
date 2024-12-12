"use client";
import { toast } from "@/hooks/use-toast";
import { deleteAddress, setDefaultAddress } from "@/services/addressService";
import { Address as address } from "@/types/user";
import formatPhoneNumber from "@/utils/phoneNumberFormatter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressForm } from "./AddressForm";
import { useEffect, useState } from "react";

type AddressProps = {
  address: address;
};

const UserAddress: React.FC<AddressProps> = ({ address }: AddressProps) => {
  const queryClient = useQueryClient();
  const [selectedAddress, setSelectedAddress] = useState<address | null>(null);

  const mutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast({
        description: "Đã thiết lập địa chỉ mặc định ✅",
      });
    },
    onError: (error) => {
      toast({
        description: "Không thể thiết lập địa chỉ mặc định ❌",
      });
      console.error(error);
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast({
        description: "Đã xóa địa chỉ ✅",
      });
    },
    onError: (error) => {
      toast({
        description: "Không thể xóa địa chỉ ❌",
      });
      console.error(error);
    },
  });

  const setDefaultAddressHandler = () => {
    mutation.mutate(address.id);
  };

  const deleteAddressHandler = () => {
    deleteAddressMutation.mutate(address.id);
  };

  return (
    <div
      className={`flex flex-col gap-2 pt-5 pb-6 mb-8 px-4 ${
        address.isDeliveryAddress ? "border-1 border-primary border-dashed" : ""
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
            <AddressForm header="Cập nhật địa chỉ" data={address} />
            {!address.isDeliveryAddress && (
              <button className="text-primary" onClick={deleteAddressHandler}>
                Xóa
              </button>
            )}
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
        <div>
          {address.isDeliveryAddress ? (
            <button className="text-secondaryText p-1 text-sm border border-secondaryText hover:cursor-not-allowed opacity-70">
              Thiết lập mặc định
            </button>
          ) : (
            <button
              onClick={setDefaultAddressHandler}
              className="text-secondaryText p-1 text-sm border border-secondaryText hover:cursor-pointer hover:opacity-70"
            >
              Thiết lập mặc định
            </button>
          )}
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

export default UserAddress;
