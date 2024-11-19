"use client";
import CartItem from "@/components/CartItem";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  const { cartItems, isLoading: isPending, error, getCartItems } = useCart();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }

    if (isAuthenticated && user) {
      getCartItems(user.id);
    }
  }, [isAuthenticated, router, isLoading, user, getCartItems]);

  if (isLoading || isPending) {
    return (
      <div className="flex items-center justify-center h-screen -mt-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems?.map((item) => (
          <CartItem key={item.productItem.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Page;
