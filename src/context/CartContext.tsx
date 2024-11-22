"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  deleteAllCartItems,
} from "@/services/cartService";
import {
  CartItem,
  CartItemRequest,
  CartItemDeletionRequest,
} from "@/types/cart";

type CartContextType = {
  cartItems: CartItem[] | null;
  isLoading: boolean;
  error: string | null;
  getCartItems: (userId: number) => Promise<void>;
  addToCart: (userId: number, data: CartItemRequest) => Promise<void>;
  syncCartItemWithBackend: (
    userId: number,
    productItemId: number,
    quantity: number
  ) => void;
  updateCartItemLocally: (productItemId: number, quantity: number) => void;
  removeCartItem: (
    userId: number,
    data: CartItemDeletionRequest
  ) => Promise<void>;
  clearCart: (userId: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCartItems = useCallback(async (userId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await getCartItems(userId);
      setCartItems(items);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch cart items.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToCart = async (userId: number, data: CartItemRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await addCartItem(userId, data);
      await getCartItems(userId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add item to cart.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItemLocally = (productItemId: number, quantity: number) => {
    setCartItems((prevItems) =>
      (prevItems ?? []).map((item) =>
        item.productItem.id === productItemId ? { ...item, quantity } : item
      )
    );
  };

  const syncCartItemWithBackend = async (
    userId: number,
    productItemId: number,
    quantity: number
  ) => {
    try {
      await updateCartItem(userId, { productItemId, quantity });
    } catch (error) {
      console.error("Failed to sync cart item with backend:", error);
    }
  };

  const removeCartItem = async (
    userId: number,
    data: CartItemDeletionRequest
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteCartItem(userId, data);
      await handleGetCartItems(userId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to remove cart item.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async (userId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteAllCartItems(userId);
      setCartItems([]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to clear cart.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        error,
        getCartItems: handleGetCartItems,
        addToCart,
        updateCartItemLocally,
        syncCartItemWithBackend,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
