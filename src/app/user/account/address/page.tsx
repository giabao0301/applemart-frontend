"use client";
import UserAddress from "@/components/UserAddress";
import { getAddresses } from "@/services/addressService";
import { isAuthenticated } from "@/services/authService";
import { Address } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../loading";
import { AddressForm } from "@/components/AddressForm";

const Page = () => {
  const {
    data: addresses,
    isLoading,
    isFetching,
    error,
  } = useQuery<Address[] | null>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const authenticated = await isAuthenticated();
      return authenticated ? getAddresses() : null;
    },
  });

  if (error) {
    console.log("Error fetching user address: ", error);
    return <div>Error fetching user address: {error.message}</div>;
  }

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="w-4/5 bg-white p-6">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Địa chỉ của tôi</h2>
          <AddressForm header="Địa chỉ mới" />
        </div>
        <div className="mt-8 text-lg">Địa chỉ</div>
        <div className="mt-4">
          {addresses?.map((address) => (
            <UserAddress key={address.id} address={address} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
