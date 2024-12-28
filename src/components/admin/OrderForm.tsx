import { Input } from "@/components/ui/input";
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
import { Pencil, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useCallback, useState } from "react";
import { Address } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress, updateAddress } from "@/services/addressService";
import { toast } from "@/hooks/use-toast";

type OrderTable = {
  orderId: number;
  userId: number;
  orderDate: string;
  totalAmount: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  orderStatus: string;
};

export function OrderForm({
  header,
  data,
  children,
}: {
  header: string;
  data?: OrderTable;
  children?: React.ReactNode;
}) {
  const [order, setOrder] = useState<OrderTable | null>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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

  const updateOrderMutation = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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

  return (
    <>
      <Button onClick={onOpen}>{children}</Button>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                {header}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div>Mã đơn hàng: </div> <div>{data?.orderId}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Mã khách hàng: </div> <div>{data?.userId}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Ngày đặt hàng: </div> <div>{data?.orderDate}</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Thoát
                </Button>
                <Button color="primary" radius="sm">
                  Lưu
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
