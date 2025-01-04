import { Address } from "@/types/user";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import AddressItem from "@/components/landing/address/AddressItem";
import { useEffect, useState } from "react";
import formatPrice from "@/utils/priceFormatter";
import { CheckIcon } from "lucide-react";
import { ShippingMethod } from "@/types/order";

const ShippingMethodSelector = ({
  selectedItem,
  shippingMethods,
  onSelect,
}: {
  selectedItem: ShippingMethod | null;
  shippingMethods: ShippingMethod[];
  onSelect: (address: ShippingMethod) => void;
}) => {
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);

  useEffect(() => {
    setSelectedShippingMethod(selectedItem);
  }, [selectedItem]);

  const selectedShippingMethodHandler = () => {
    if (selectedShippingMethod) {
      onSelect(selectedShippingMethod);
      onClose();
    }
  };

  return (
    <>
      <button className="text-primary" onClick={onOpen}>
        Thay đổi
      </button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                Chọn phương thức vận chuyển
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                {shippingMethods.map((shippingMethod) => (
                  <div
                    className="flex justify-between hover:opacity-70 p-2 cursor-pointer bg-slate-100"
                    key={shippingMethod.id}
                    onClick={() => setSelectedShippingMethod(shippingMethod)}
                  >
                    <div className="flex gap-2">
                      <div>{shippingMethod.name}: </div>
                      <div>{formatPrice(shippingMethod.price)}đ</div>
                    </div>
                    {selectedShippingMethod?.id === shippingMethod.id && (
                      <CheckIcon size={20} color="#0070c9" />
                    )}
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Trở lại
                </Button>
                <Button
                  color="primary"
                  radius="none"
                  onPress={selectedShippingMethodHandler}
                >
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShippingMethodSelector;
