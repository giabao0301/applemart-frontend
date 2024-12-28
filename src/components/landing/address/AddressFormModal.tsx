import { Input } from "@/components/ui/input";
import LocationSelector from "./LocationSelector";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useCallback, useState } from "react";
import { Address } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress, updateAddress } from "@/services/addressService";
import { toast } from "@/hooks/use-toast";

type AddressInfo = {
  province: string;
  district: string;
  ward: string;
};

export function AddressFormModal({
  header,
  data,
}: {
  header: string;
  data?: Address;
}) {
  const [address, setAddress] = useState<Address | null>({
    id: data?.id || 0,
    recipient: data?.recipient || "",
    phone: data?.phone || "",
    city: data?.city || "",
    district: data?.district || "",
    ward: data?.ward || "",
    address: data?.address || "",
    addressType: data?.addressType || "",
    isDeliveryAddress: data?.isDeliveryAddress || false,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast({
        description: "Đã thêm địa chỉ mới ✅",
      });
    },
    onError: (error) => {
      toast({
        description: "Không thể thêm địa chỉ mới ❌",
      });
      console.error(error);
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast({
        description: "Đã cập nhật địa chỉ mới ✅",
      });
    },
    onError: (error) => {
      toast({
        description: "Không thể cập nhật địa chỉ mới ❌",
      });
      console.error(error);
    },
  });

  const saveSelectedAddressHandler = useCallback(
    (selectedAddress: AddressInfo) => {
      console.log("Selected address: ", selectedAddress);

      if (selectedAddress) {
        setAddress({
          ...address!,
          city: selectedAddress.province,
          district: selectedAddress.district,
          ward: selectedAddress.ward,
        });
      }
    },
    [address]
  );

  const addNewAddressHandler = () => {
    if (!address) return;
    mutation.mutate(address);
    onOpenChange();
  };

  const updateAddressHandler = () => {
    if (!address) return;
    updateAddressMutation.mutate(address);
    onOpenChange();
  };

  return (
    <>
      {header === "Cập nhật địa chỉ" ? (
        <button className="text-primary" onClick={onOpen}>
          Cập nhật
        </button>
      ) : (
        <Button
          onPress={onOpen}
          className="text-md bg-primary text-white"
          size="sm"
          radius="none"
        >
          <Plus size={16} />
          Thêm địa chỉ mới
        </Button>
      )}

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                {header}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                <div className="flex justify-between gap-2">
                  <Input
                    className="border-2 border-gray-300"
                    placeholder="Tên người nhận"
                    value={address?.recipient}
                    onChange={(e) =>
                      setAddress({ ...address!, recipient: e.target.value })
                    }
                  />

                  <Input
                    className="border-2 border-gray-300"
                    placeholder="Số điện thoại"
                    value={address?.phone}
                    onChange={(e) =>
                      setAddress({ ...address!, phone: e.target.value })
                    }
                  />
                </div>
                <LocationSelector
                  onSaveSelectedAddress={saveSelectedAddressHandler}
                  data={address}
                />
                <Input
                  className="border-2 border-gray-300"
                  placeholder="Địa chỉ cụ thể"
                  value={address?.address}
                  onChange={(e) =>
                    setAddress({ ...address!, address: e.target.value })
                  }
                />

                <Label>Loại địa chỉ:</Label>
                <div className="flex gap-2">
                  <button
                    className={`p-2 border ${
                      address?.addressType === "Nhà riêng"
                        ? "border-primary"
                        : ""
                    }`}
                    onClick={() =>
                      setAddress({ ...address!, addressType: "Nhà riêng" })
                    }
                  >
                    Nhà riêng
                  </button>
                  <button
                    className={`p-2 border ${
                      address?.addressType === "Văn phòng"
                        ? "border-primary"
                        : ""
                    }`}
                    onClick={() =>
                      setAddress({ ...address!, addressType: "Văn phòng" })
                    }
                  >
                    Văn phòng
                  </button>
                </div>
                <div>
                  {data?.isDeliveryAddress ? (
                    <Checkbox
                      isDisabled
                      isSelected
                      onChange={(e) =>
                        setAddress({
                          ...address!,
                          isDeliveryAddress: e.target.checked,
                        })
                      }
                    >
                      Đặt làm địa chỉ mặc định
                    </Checkbox>
                  ) : (
                    <Checkbox
                      onChange={(e) =>
                        setAddress({
                          ...address!,
                          isDeliveryAddress: e.target.checked,
                        })
                      }
                    >
                      Đặt làm địa chỉ mặc định
                    </Checkbox>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Trở lại
                </Button>
                <Button
                  color="primary"
                  radius="none"
                  onPress={
                    header === "Cập nhật địa chỉ"
                      ? updateAddressHandler
                      : addNewAddressHandler
                  }
                >
                  Hoàn thành
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
