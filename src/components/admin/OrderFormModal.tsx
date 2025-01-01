import { Input } from "@/components/ui/input";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Pencil, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useCallback, useState } from "react";
import { Address } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAddress,
  getAddressById,
  updateAddress,
} from "@/services/addressService";
import { toast } from "@/hooks/use-toast";
import formatPrice from "@/utils/priceFormatter";
import { updateOrder } from "@/services/orderService";
import { formatDate, reformatDate } from "@/utils/dateFormatter";
import { getUserById } from "@/services/userService";
import { Order } from "@/types/order";
import OrderDetail from "../landing/order/OrderDetail";

const paymentStatusOptions = [
  {
    key: "completed",
    label: "Hoàn thành",
  },
  {
    key: "unpaid",
    label: "Chưa thanh toán",
  },
  {
    key: "failed",
    label: "Thất bại",
  },
];

const orderStatusOptions = [
  {
    key: "pending",
    label: "Chờ xác nhận",
  },
  {
    key: "preparing",
    label: "Đang chuẩn bị",
  },
  {
    key: "delivering",
    label: "Đang giao",
  },
  {
    key: "completed",
    label: "Hoàn thành",
  },
  {
    key: "cancelled",
    label: "Đã hủy",
  },
  {
    key: "returned",
    label: "Đã trả",
  },
];

export function OrderFormModal({
  header,
  data,
  children,
}: {
  header: string;
  data?: Order;
  children?: React.ReactNode;
}) {
  const [order, setOrder] = useState<Order | null>(data || null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user", data?.userId],
    queryFn: () => {
      if (data?.userId) {
        return getUserById(data?.userId);
      }
    },
    enabled: !!data?.userId,
  });

  const { data: address } = useQuery({
    queryKey: ["address", data?.addressId],
    queryFn: () =>
      order?.addressId
        ? getAddressById(data?.userId as number, data?.addressId as number)
        : Promise.resolve(null),
    enabled: !!order?.addressId,
  });

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        description: "Đã cập nhật đơn hàng ✅",
      });
    },
    onError: (error) => {
      toast({
        description: "Không thể cập nhật đơn hàng ❌",
      });
      console.error(error);
    },
  });

  const updateOrderHandler = () => {
    if (order) {
      updateOrderMutation.mutate(order);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  };

  const isReadOnly = header === "Chi tiết đơn hàng" ? true : false;

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                {header}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div>Mã đơn hàng: </div> <div>{data?.id}</div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>Thông tin khách hàng: </div>
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-12">
                      <div className="text-right">Họ và Tên: </div>
                      <div>{user?.fullName}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-12">
                      <div className="text-right">Email: </div>
                      <div>{user?.email}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-12">
                      <div className="text-right">Số điện thoại: </div>
                      <div>{user?.phoneNumber}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>Địa chỉ nhận hàng: </div>
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-12">
                      <div className="text-right">Người nhận: </div>
                      <div>{address?.recipient}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-12">
                      <div className="text-right">Số điện thoại: </div>
                      <div>{address?.phone}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-12">
                      <div className="text-right">Địa chỉ: </div>
                      <div>
                        {address?.address}, {address?.ward}, {address?.district}
                        ,{address?.city}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Thời gian đặt hàng: </div>{" "}
                  <div>{formatDate(data?.orderDate || "")}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Trạng thái thanh toán: </div>
                  <Select
                    className="w-1/2"
                    isDisabled={isReadOnly}
                    aria-label="Trạng thái thanh toán"
                    defaultSelectedKeys={[
                      paymentStatusOptions.find(
                        (option) => option.label === data?.paymentStatus
                      )?.label || "",
                    ]}
                    onChange={(e) => {
                      setOrder((prevOrder) => {
                        if (!prevOrder) return prevOrder;
                        return {
                          ...prevOrder,
                          paymentStatus: e.target.value as string,
                        };
                      });
                    }}
                  >
                    {paymentStatusOptions.map((option) => (
                      <SelectItem key={option.label} value={option.key}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <div>Phương thức vận chuyển: </div>
                  <div>{data?.shippingMethod}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Tình trạng đơn hàng: </div>
                  <Select
                    className="w-1/2"
                    isDisabled={isReadOnly}
                    aria-label="Trạng thái đơn hàng"
                    defaultSelectedKeys={[
                      orderStatusOptions.find(
                        (option) => option.label === data?.orderStatus
                      )?.label || "",
                    ]}
                    onChange={(e) => {
                      setOrder((prevOrder) => {
                        if (!prevOrder) return prevOrder;
                        return {
                          ...prevOrder,
                          orderStatus: e.target.value as string,
                        };
                      });
                    }}
                  >
                    {orderStatusOptions.map((option) => (
                      <SelectItem key={option.label} value={option.key}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div>Chi tiết đơn hàng: </div>
                {order && <OrderDetail order={order} />}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Thoát
                </Button>
                {!isReadOnly && (
                  <Button
                    color="primary"
                    radius="sm"
                    onClick={updateOrderHandler}
                  >
                    Lưu
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
