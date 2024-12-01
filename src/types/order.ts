interface NewOrderRequest {
  userId: number;
  addressId: number;
  paymentMethod: string;
  shippingMethod: string;
  orderLines: OrderLine[];
}

interface Order {
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

interface OrderLine {
  id?: number;
  productItemId: number;
  quantity: number;
}

interface ShippingMethod {
  id: number;
  name: string;
  price: number;
}

interface PaymentMethod {
  id: number;
  userId: number;
  name: string;
  provider: string;
  accountNumber: string;
  expiryDate: string;
  isDefault: boolean;
}

interface OrderCreationResponse {
  result: string;
  vnpayLink: string;
  order: Order;
}
