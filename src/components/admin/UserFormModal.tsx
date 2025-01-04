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
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { Pencil, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useCallback, useState } from "react";
import { UpdateProfileFormData } from "@/types/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAddress,
  getAddressesByUserId,
  updateAddress,
} from "@/services/addressService";
import { toast } from "@/hooks/use-toast";
import formatPrice from "@/utils/priceFormatter";
import { updateOrder } from "@/services/orderService";
import { formatDate, reformatDate } from "@/utils/dateFormatter";
import { updateProfile, updateUserById } from "@/services/userService";
import { User } from "@/types/user";

const roleOptions = [
  {
    id: 1,
    name: "ADMIN",
  },
  {
    id: 2,
    name: "USER",
  },
  {
    id: 3,
    name: "STAFF",
  },
];

export function UserFormModal({
  header,
  data,
  children,
}: {
  header: string;
  data?: User;
  children?: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(data || ({} as User));

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const { data: addresses } = useQuery({
    queryKey: ["addresses", data?.id],
    queryFn: () =>
      data?.id
        ? getAddressesByUserId(data?.id as number)
        : Promise.resolve(null),
    enabled: !!data?.id,
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUserById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        description: "Đã cập nhật thông tin người dùng ✅",
      });
    },
    onError: (error) => {
      toast({
        description: "Không thể cập nhật người dùng ❌",
      });
      console.error(error);
    },
  });

  const updateOrderHandler = () => {
    if (user) {
      if (data?.id !== undefined) {
        updateUserMutation.mutate(user);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  };

  const isReadOnly = header === "Chi tiết người dùng" ? true : false;

  console.log(user);

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
                  <div>Mã người dùng: </div> <div>{data?.id}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Tên đăng nhập: </div> <div>{data?.username}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Email: </div>
                  <div>{user?.email}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Tên đầy đủ: </div>
                  <div>{user?.fullName}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Ngày sinh: </div>
                  <div>{formatDate(user?.dateOfBirth || "")}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>Số điện thoại: </div>
                  <div>{user?.phoneNumber}</div>
                </div>
                <div>Địa chỉ nhận hàng: </div>
                {addresses?.map((address) => (
                  <div className="flex flex-col gap-2" key={address.id}>
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
                ))}

                <div className="flex items-center gap-4">
                  <div>Vai trò: </div>
                  <Select
                    className="w-1/2"
                    isDisabled={isReadOnly}
                    aria-label="Vai trò"
                    defaultSelectedKeys={[
                      roleOptions
                        .find((option) => option.id === data?.roles[0].id)
                        ?.id.toString() ?? "2",
                    ]}
                    onChange={(e) => {
                      console.log(e.target.value);

                      setUser((prevUser) => {
                        if (!prevUser) return prevUser;
                        return {
                          ...prevUser,
                          roles: [
                            {
                              id: parseInt(e.target.value),
                              name:
                                roleOptions.find(
                                  (option) =>
                                    option.id === parseInt(e.target.value)
                                )?.name || "",
                            },
                          ],
                        };
                      });
                    }}
                  >
                    {roleOptions.map((option) => (
                      <SelectItem key={option.id} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Switch
                  defaultSelected={data?.enabled}
                  color="success"
                  isDisabled={isReadOnly}
                  onValueChange={(value) => {
                    setUser((prevUser) => {
                      if (!prevUser) return prevUser;
                      return {
                        ...prevUser,
                        enabled: value,
                      };
                    });
                  }}
                >
                  Xác thực
                </Switch>
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
