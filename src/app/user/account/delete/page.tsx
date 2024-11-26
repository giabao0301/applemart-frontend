"use client";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/custom/AlertDialog";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { deleteAccount } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.replace("/");
    },
    onError: (error) => {
      console.log("Error deleting account: ", error);
      toast({
        title: "Uh oh! 😕",
        description: "Không thể xóa tài khoản của bạn, vui lòng thử lại sau",
      });
    },
  });

  const deleteAccountHandler = () => {
    if (!user) return;
    mutation.mutate(user?.id);
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl pb-8 border-b">Quan trọng</h2>
      <p className="text-lg mt-5">
        Nhấn &quot;Tiếp tục&quot; đồng nghĩa với việc bạn đồng ý với các điều
        khoản sau đây:
      </p>
      <ul className="flex flex-col gap-2 mt-3 mb-5 px-8 text-secondaryText">
        <li className="list-disc">
          Sau khi xác nhận xóa tài khoản, bạn sẽ không thể đăng nhập cũng như
          khôi phục lại tài khoản. Vui lòng cân nhắc trước khi xác nhận xóa.
        </li>

        <li className="list-disc">
          Việc xóa tài khoản sẽ không thực hiện được nếu bạn có đơn hàng mua/bán
          chưa hoàn tất, hoặc các vấn đề liên quan đến pháp lý chưa được xử lý
          xong (nếu có).
        </li>
        <li className="list-disc">
          Sau khi xoá tài khoản, Applemart có thể lưu trữ một số dữ liệu của bạn
          theo quy định tại Chính sách bảo mật của Applemart và quy định pháp
          luật có liên quan.
        </li>
        <li className="list-disc">
          Applemart bảo lưu quyền từ chối bất cứ yêu cầu tạo tài khoản mới nào
          từ bạn trong tương lai.
        </li>
        <li className="list-disc">
          Việc xoá tài khoản không đồng nghĩa với việc loại bỏ tất cả trách
          nhiệm và nghĩa vụ liên quan của bạn trên tài khoản đã xóa.
        </li>
      </ul>
      <Alert
        title="Xóa vĩnh viễn tài khoản"
        description="Chúng tôi rất lấy làm tiếc khi bạn muốn rời Applemart, nhưng xin lưu ý các tài khoản bị xóa sẽ không được mở trở lại"
        action="Đồng ý"
        cancel="Hủy"
        onAction={deleteAccountHandler}
      >
        <Button
          className="bg-primary hover:bg-primary hover:opacity-70 text-md mt-4"
          size={"lg"}
        >
          Tiếp tục
        </Button>
      </Alert>
    </div>
  );
};

export default Page;
