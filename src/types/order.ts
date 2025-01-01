export interface NewOrderRequest {
  userId: number;
  addressId: number;
  paymentMethod: string;
  shippingMethod: string;
  orderLines: OrderLine[];
}

export interface Order {
  id: number;
  userId: number;
  orderDate: string;
  addressId: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  orderStatus: string;
  orderLines: OrderLine[];
}

export interface OrderLine {
  id?: number;
  productItemId: number;
  quantity: number;
}

export interface ShippingMethod {
  id: number;
  name: string;
  price: number;
}

export interface PaymentMethod {
  id: number;
  userId: number;
  name: string;
  provider: string;
  accountNumber: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface OrderCreationResponse {
  result: string;
  vnpayLink: string;
  order: Order;
}

export interface OrderStats {
  totalRevenue: number;
  totalOrders: number;
}

enum OrderStatus {
  PENDING = "Chờ xác nhận",
  PREPARING = "Đang chuẩn bị hàng",
  DELIVERING = "Đang giao",
  SUCCESS = "Hoàn thành",
  CANCELED = "Đã hủy",
  RETURNED = "Trả hàng",
}

enum PaymentStatus {
  PENDING = "Đang chờ",
  SUCCESS = "Hoàn tất",
  FAILED = "Thất bại",
}
