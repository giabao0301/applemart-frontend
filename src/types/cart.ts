import { ProductItem } from "./product";

export interface CartItem {
  id: number;
  quantity: number;
  productItem: ProductItem;
}

export interface CartItemRequest {
  productItemId: number;
  quantity: number;
}

export interface CartItemDeletionRequest {
  productItemIds: number[];
}
