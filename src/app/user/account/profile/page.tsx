"use client";
import { isAuthenticated } from "@/services/authService";
import { getUserInfo, updateProfile } from "@/services/userService";
import { UpdateProfileSchema } from "@/types/user";
import { UpdateProfileFormData } from "@/types/form";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DateInput, Spinner } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ApiError } from "@/types/error";
import Image from "next/image";
import { uploadImage } from "@/services/uploadImageService";
import { set } from "zod";

const Page = () => {
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const authenticated = await isAuthenticated();
      return authenticated ? getUserInfo() : null;
    },
  });

  const [form, setForm] = useState<UpdateProfileFormData | null>({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    profileImageUrl: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: today(getLocalTimeZone()).toString(),
      profileImageUrl: "",
    },
  });

  useEffect(() => {
    setLoading(true);
    if (user) {
      setValue("username", user.username || "");
      setValue("fullName", user.fullName || "");
      setValue("email", user.email || "");
      setValue("phoneNumber", user.phoneNumber || "");
      setValue(
        "dateOfBirth",
        user.dateOfBirth || today(getLocalTimeZone()).toString()
      );
      setValue("profileImageUrl", user.profileImageUrl || "");
      if (user.profileImageUrl) {
        setImageUrl(user.profileImageUrl);
        setLoading(false);
      }
    }
  }, [user, setValue]);

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProfileFormData }) =>
      updateProfile(id, data),
    onSuccess: () => {
      toast({
        description: "Đã lưu ✅",
      });
    },
    onError: (error: AxiosError) => {
      if (
        (error.response?.data as ApiError).message === "No data changes found"
      ) {
        toast({
          title: "Không có thay đổi",
          description: "Thông tin không thay đổi",
        });
        return;
      }
      toast({
        title: "Uh oh! 😕",
        description: "Có lỗi xảy ra khi lưu thông tin",
      });
    },
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error fetching user info: ", error);
    return <div>Error fetching user info: {error.message}</div>;
  }

  const validateDate = (value: any) => {
    const minDate = new Date("1900-01-01");
    const maxDate = new Date("2099-12-31");
    const inputDate = value.toDate();

    if (inputDate < minDate) {
      return "Ngày sinh phải sau 01/01/1900";
    }

    if (inputDate > maxDate) {
      return "Ngày sinh phải trước 31/12/2099";
    }

    return true;
  };

  const changeFormDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
        }
      };
    }
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    console.log(data);

    if (imageFile) {
      try {
        const url = await uploadImage(imageFile);
        setImageUrl(url);
        data.profileImageUrl = url;
        console.log(url);
      } catch {
        toast({
          title: "Uh oh! 😕",
          description: "Có lỗi xảy ra khi tải ảnh lên",
        });
        return;
      }
    }
    if (user) {
      console.log(data);
      mutation.mutate({ id: user.id, data });
    }
  };

  return (
    <div className="w-4/5">
      <div className="w-full">
        <h1>Hồ sơ của tôi</h1>
        <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="max-w-[652px] w-full pt-8 pb-5 px-0">
          <div className="flex justify-between">
            <div className="flex flex-col justify-around items-center mx-auto gap-6 mb-4">
              <Input
                type="text"
                label="Tên đăng nhập"
                variant="bordered"
                className="max-w-xs mr-32"
                {...register("username")}
                isInvalid={errors.username ? true : false}
                errorMessage={errors.username?.message}
                labelPlacement="outside-left"
                name="username"
                onChange={changeFormDataHandler}
              />
              <Input
                type="text"
                label="Tên"
                variant="bordered"
                className="max-w-xs"
                {...register("fullName")}
                isInvalid={errors.fullName ? true : false}
                errorMessage={errors.fullName?.message}
                labelPlacement="outside-left"
                name="fullName"
                onChange={changeFormDataHandler}
              />
              <Input
                type="text"
                label="Email"
                variant="bordered"
                className="max-w-xs mr-4"
                {...register("email")}
                isInvalid={errors.email ? true : false}
                errorMessage={errors.email?.message}
                labelPlacement="outside-left"
                name="email"
                onChange={changeFormDataHandler}
              />
              <Input
                type="text"
                label="Số điện thoại"
                variant="bordered"
                className="max-w-xs mr-24"
                {...register("phoneNumber")}
                isInvalid={errors.phoneNumber ? true : false}
                errorMessage={errors.phoneNumber?.message}
                labelPlacement="outside-left"
                name="phoneNumber"
                onChange={changeFormDataHandler}
              />
              <DateInput
                label={"Ngày sinh"}
                defaultValue={
                  user?.dateOfBirth
                    ? parseDate(user.dateOfBirth)
                    : today(getLocalTimeZone())
                }
                className="max-w-xs mr-40"
                labelPlacement="outside-left"
                validate={validateDate}
                errorMessage={errors.dateOfBirth?.message}
                {...register("dateOfBirth")}
                name="dateOfBirth"
                onChange={(e) =>
                  setForm({
                    ...form,
                    dateOfBirth: e.toString(),
                  } as UpdateProfileFormData)
                }
              />
              <div className="min-h-10 max-w-full text-center pt-4 mr-36">
                <Button
                  type="submit"
                  radius="full"
                  className="bg-gradient-to-b from-[#42a1ec] to-[#0070c9] text-white shadow-lg text-[18px] py-1 px-[15px] focus:outline-none"
                >
                  {mutation.isPending ? (
                    <Spinner color="white" size="sm" />
                  ) : (
                    "Lưu"
                  )}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <Input
                id="picture"
                type="file"
                label="Ảnh đại diện"
                labelPlacement="outside-left"
                name="profileImageUrl"
                onChange={changeFormDataHandler}
                accept="image/*"
              />
              {loading ? (
                <Spinner size="sm" />
              ) : (
                imageUrl && (
                  <Image
                    src={imageUrl}
                    className="w-1/4 h-1/4 object-cover"
                    alt=""
                    width={50}
                    height={50}
                    quality={100}
                    unoptimized={true}
                    priority
                  />
                )
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
