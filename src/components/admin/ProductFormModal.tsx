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
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, useToast } from "@/hooks/use-toast";
import { User } from "@/types/user";
import { Category, Product, Variation, VariationOption } from "@/types/product";
import {
  createCategory,
  createProduct,
  updateCategoryById,
  updateProductById,
} from "@/services/productService";
import { Label } from "../ui/label";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import {
  deleteImage,
  extractPublicId,
  uploadImage,
} from "@/services/imageService";
import { UploadImage } from "../UploadImage";

export function ProductFormModal({
  header,
  data,
  children,
  type,
}: {
  header: string;
  data?: Product;
  children?: React.ReactNode;
  type: string;
}) {
  const [product, setProduct] = useState<Product>(data || ({} as Product));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    setProduct(data || ({} as Product));
  }, [data]);

  const { toast } = useToast();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: updateProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        description: "Đã cập nhật sản phẩm ✅",
      });
    },
    onError: (error) => {
      toast({
        description: "Không thể cập nhật sản phẩm ❌",
      });
      console.error(error);
    },
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        description: "Đã tạo mới sản phẩm ✅",
      });
      setProduct({} as Product);
    },
    onError: (error) => {
      toast({
        description: "Không thể tạo mới sản phẩm ❌",
      });
      console.error(error);
    },
  });

  const updateProductHandler = async () => {
    if (imageFile) {
      try {
        const url = await uploadImage(imageFile);
        setImageUrl(url);
        product.thumbnailUrl = url;
        product.id = -1;
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

    if (product) {
      if (data?.id !== undefined) {
        updateProductMutation.mutate(product);
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const createProductHandler = async () => {
    if (imageFile) {
      try {
        const url = await uploadImage(imageFile);
        setImageUrl(url);
        product.thumbnailUrl = url;
        product.id = -1;
        product.images = [{ id: -1, url }];
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

    if (product) {
      createProductMutation.mutate(product);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const changeImageHandler = (file: File | null, url: string) => {
    setImageFile(file);
    setImageUrl(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setProduct({ ...product, [id]: value });
  };

  const isReadOnly = type === "read" ? true : false;

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
                    <div>Mã sản phẩm:</div>
                    <div>{data?.id}</div>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div>Tên sản phẩm:</div>
                  <Input
                    className="w-1/2"
                    type="text"
                    id="name"
                    value={product.name}
                    onChange={handleInputChange}
                    isReadOnly={isReadOnly}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div>Danh mục:</div>
                  <Input
                    className="w-1/2"
                    type="text"
                    id="category"
                    value={product.category}
                    onChange={handleInputChange}
                    isReadOnly={isReadOnly}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div>Giá:</div>
                  <Input
                    className="w-1/2"
                    type="number"
                    id="lowestPrice"
                    value={
                      product.lowestPrice ? product.lowestPrice.toString() : ""
                    }
                    onChange={handleInputChange}
                    isReadOnly={isReadOnly}
                  />
                </div>
                {type === "read" ? (
                  <>
                    <div>Ảnh sản phẩm:</div>
                    <Image
                      src={product.thumbnailUrl}
                      alt={product.name}
                      width={200}
                      height={200}
                    />
                  </>
                ) : (
                  <UploadImage
                    label="Ảnh sản phẩm"
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
                        ? createProductHandler
                        : updateProductHandler
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
