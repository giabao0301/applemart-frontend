import { ProductItem } from "./product";

interface CartItem {
  id: number;
  quantity: number;
  productItem: ProductItem;
}

interface CartItemRequest {
  productItemId: number;
  quantity: number;
}

interface CartItemDeletionRequest {
  productItemId: number;
}

export type { CartItem, CartItemRequest, CartItemDeletionRequest };