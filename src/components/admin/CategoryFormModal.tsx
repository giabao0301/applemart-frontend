import {
  Avatar,
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, useToast } from "@/hooks/use-toast";
import { User } from "@/types/user";
import { Category, Variation, VariationOption } from "@/types/product";
import { createCategory, updateCategoryById } from "@/services/productService";
import { Label } from "../ui/label";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import {
  deleteImage,
  extractPublicId,
  uploadImage,
} from "@/services/imageService";
import { UploadImage } from "../UploadImage";

export function CategoryFormModal({
  header,
  data,
  children,
  type,
}: {
  header: string;
  data?: Category;
  children?: React.ReactNode;
  type: string;
}) {
  const [category, setCategory] = useState<Category>(data || ({} as Category));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { toast } = useToast();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategoryById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        description: "Đã cập nhật danh mục sản phẩm ✅",
      });
    },
    onError: (error) => {
      toast({
        description: "Không thể cập nhật danh mục sản phẩm ❌",
      });
      console.error(error);
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        description: "Đã tạo mới danh mục sản phẩm ✅",
      });
      setCategory({} as Category);
    },
    onError: (error) => {
      toast({
        description: "Không thể tạo mới danh mục sản phẩm ❌",
      });
      console.error(error);
    },
  });

  const updateCategoryHandler = async () => {
    if (imageFile) {
      try {
        const url = await uploadImage(imageFile);
        setImageUrl(url);
        category.thumbnailUrl = url;
        category.id = -1;
        if (data?.thumbnailUrl) {
          await deleteImage(extractPublicId(data?.thumbnailUrl));
        }
      } catch (error) {
        toast({
          title: "Uh oh! 😕",
          description: "Có lỗi xảy ra khi tải ảnh lên",
        });
        console.log(error);
      }
    }

    if (category) {
      if (data?.id !== undefined) {
        updateCategoryMutation.mutate(category);
      }
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  };

  const createCategoryHandler = async () => {
    if (imageFile) {
      try {
        const url = await uploadImage(imageFile);
        setImageUrl(url);
        category.thumbnailUrl = url;
        category.id = -1;
        if (data?.thumbnailUrl) {
          await deleteImage(extractPublicId(data?.thumbnailUrl));
        }
      } catch (error) {
        toast({
          title: "Uh oh! 😕",
          description: "Có lỗi xảy ra khi tải ảnh lên",
        });
        console.log(error);
      }
    }

    if (category) {
      createCategoryMutation.mutate(category);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  };

  const changeImageHandler = (file: File | null, url: string) => {
    setImageFile(file);
    setImageUrl(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setCategory({ ...category, [id]: value });
  };

  const handleVariationChange = (
    variationIndex: number,
    key: keyof Variation,
    value: string
  ) => {
    const updatedVariations = [...(category.variations || [])];
    updatedVariations[variationIndex] = {
      ...updatedVariations[variationIndex],
      [key]: value,
    };
    setCategory({ ...category, variations: updatedVariations });
  };

  const handleOptionChange = (
    variationIndex: number,
    optionIndex: number,
    key: keyof VariationOption,
    value: string
  ) => {
    const updatedVariations = [...(category.variations || [])];
    const updatedOptions = [...updatedVariations[variationIndex].options];
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      [key]: value,
    };
    updatedVariations[variationIndex].options = updatedOptions;
    setCategory({ ...category, variations: updatedVariations });
  };

  const addVariation = () => {
    setCategory({
      ...category,
      variations: [
        ...(category.variations || []),
        { id: 0, name: "", options: [] },
      ],
    });
  };

  const addOption = (variationIndex: number) => {
    const updatedVariations = [...(category.variations || [])];
    updatedVariations[variationIndex].options.push({
      id: -1,
      value: "",
      imageUrl: "",
    });
    setCategory({ ...category, variations: updatedVariations });
  };

  const removeVariation = (variationIndex: number) => {
    const updatedVariations = [...(category.variations || [])];
    updatedVariations.splice(variationIndex, 1);
    setCategory({ ...category, variations: updatedVariations });
  };

  const removeOption = (variationIndex: number, optionIndex: number) => {
    const updatedVariations = [...(category.variations || [])];
    updatedVariations[variationIndex].options.splice(optionIndex, 1);
    setCategory({ ...category, variations: updatedVariations });
  };

  const isReadOnly = type === "read" ? true : false;

  console.log(category);

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                {header}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6">
                {type !== "create" && (
                  <div className="flex items-center gap-4">
                    <div>Mã danh mục:</div>
                    <div>{data?.id}</div>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div>Tên danh mục:</div>
                  <Input
                    className="w-1/2"
                    type="text"
                    id="name"
                    value={category.name}
                    onChange={handleInputChange}
                    isReadOnly={isReadOnly}
                  />
                </div>

                {type === "read" &&
                  data?.variations &&
                  data.variations.length > 0 && (
                    <>
                      <div>Cấu hình sản phẩm:</div>
                      <div className="flex flex-col gap-4">
                        {data.variations.map((variation) => (
                          <div key={variation.id}>
                            <div>{variation.name}:</div>
                            <ul className="grid grid-cols-3 gap-8 mt-4">
                              {variation.options.map((option) => (
                                <li key={option.id}>
                                  <Chip
                                    variant="flat"
                                    avatar={
                                      option.imageUrl && (
                                        <Avatar name="" src={option.imageUrl} />
                                      )
                                    }
                                  >
                                    {option.value}
                                  </Chip>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                {type !== "read" && (
                  <div className="mt-6">
                    <h3>Cấu hình sản phẩm:</h3>
                    {(category.variations || []).map(
                      (variation, variationIndex) => (
                        <div key={variation.id} className="border p-4 mb-4">
                          <div className="flex items-center gap-4">
                            <label>Tên cấu hình:</label>
                            <input
                              type="text"
                              value={variation.name}
                              onChange={(e) =>
                                handleVariationChange(
                                  variationIndex,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="border p-2"
                            />
                            <button
                              type="button"
                              onClick={() => removeVariation(variationIndex)}
                              className="text-red-600"
                            >
                              Xóa cấu hình
                            </button>
                          </div>
                          <div className="mt-4">
                            <h4>Tùy chọn:</h4>
                            {(variation.options || []).map(
                              (option, optionIndex) => (
                                <div
                                  key={option.id}
                                  className="flex items-center gap-4 mb-2"
                                >
                                  <input
                                    type="text"
                                    value={option.value}
                                    placeholder="Giá trị tùy chọn"
                                    onChange={(e) =>
                                      handleOptionChange(
                                        variationIndex,
                                        optionIndex,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                    className="border p-2"
                                  />
                                  <input
                                    type="text"
                                    value={option.imageUrl}
                                    placeholder="URL ảnh (nếu có)"
                                    onChange={(e) =>
                                      handleOptionChange(
                                        variationIndex,
                                        optionIndex,
                                        "imageUrl",
                                        e.target.value
                                      )
                                    }
                                    className="border p-2"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeOption(variationIndex, optionIndex)
                                    }
                                    className="text-red-600"
                                  >
                                    Xóa tùy chọn
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              type="button"
                              onClick={() => addOption(variationIndex)}
                              className="text-blue-600"
                            >
                              Thêm tùy chọn
                            </button>
                          </div>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      onClick={addVariation}
                      className="text-blue-600"
                    >
                      Thêm cấu hình
                    </button>
                  </div>
                )}
                {type === "read" ? (
                  <Image
                    src={category.thumbnailUrl}
                    className="w-auto h-auto object-cover"
                    alt=""
                    width={12}
                    height={12}
                    quality={100}
                    unoptimized={true}
                    priority
                  />
                ) : (
                  <UploadImage
                    label="Ảnh minh họa"
                    onImageChange={changeImageHandler}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Thoát
                </Button>
                {!isReadOnly && (
                  <Button
                    color="primary"
                    radius="sm"
                    onClick={
                      type === "create"
                        ? createCategoryHandler
                        : updateCategoryHandler
                    }
                  >
                    Lưu
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
