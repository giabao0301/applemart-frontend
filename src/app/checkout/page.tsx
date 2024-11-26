import { MapPin } from "lucide-react";

const Page = () => {
  return (
    <div>
      <div className="mb-3 h-16 border-b-2">
        <h2 className="text-xl text-primary">Thanh toán</h2>
      </div>
      <div className="pt-7 px-8 pb-6">
        <div className="flex gap-2 text-primary">
          <MapPin size={24} />
          <h2 className="text-lg">Địa chỉ nhận hàng</h2>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div>Trịnh Gia Bảo (+84) 869787482</div>
          <div>
            Ktx Khu A Đhqg, Đường Tạ Quang Bửu, Khu Phố 6, Phường Linh Trung,
            Thành Phố Thủ Đức, TP. Hồ Chí Minh
          </div>
          <button className="text-primary p-1 text-sm border border-primary">
            Mặc định
          </button>
          <button className="text-primary">Thay đổi</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
