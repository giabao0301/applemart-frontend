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
import AddressItem from "./AddressItem";
import { useEffect, useState } from "react";

const AddressSelector = ({
  addresses,
  onSelect,
}: {
  addresses: Address[];
  onSelect: (address: Address) => void;
}) => {
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const defaultAddress = addresses.find(
      (address) => address.isDeliveryAddress
    );
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    }
  }, [addresses, setSelectedAddress]);

  const selectedAddressHandler = () => {
    if (selectedAddress) {
      onSelect(selectedAddress);
      onClose();
    }
  };

  return (
    <>
      <button className="text-primary" onClick={onOpen}>
        Thay đổi
      </button>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                Địa chỉ của tôi
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                {addresses.map((address) => (
                  <AddressItem
                    key={address.id}
                    address={address}
                    isSelected={selectedAddress?.id === address.id}
                    onSelect={() => setSelectedAddress(address)}
                  />
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Hủy
                </Button>
                <Button
                  color="primary"
                  radius="none"
                  onPress={selectedAddressHandler}
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

export default AddressSelector;
