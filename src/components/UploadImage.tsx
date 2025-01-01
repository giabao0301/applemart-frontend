import React, { useState } from "react";
import { Input, Spinner } from "@nextui-org/react";
import Image from "next/image";

interface UploadImageProps {
  label?: string;
  onImageChange?: (imageFile: File | null, imageUrl: string) => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  label = "Upload Image",
  onImageChange,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          const resultUrl = reader.result as string;
          setImageUrl(resultUrl);
          onImageChange?.(file, resultUrl); // Notify parent component of changes
        }
        setLoading(false);
      };
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Input
        id="picture"
        type="file"
        label={label}
        labelPlacement="outside"
        name="profileImageUrl"
        onChange={changeImageHandler}
        accept="image/*"
      />
      {loading && <Spinner size="sm" />}
      {imageUrl && (
        <Image
          src={imageUrl}
          className="w-auto h-auto object-cover"
          alt="Uploaded Preview"
          width={200}
          height={200}
          quality={100}
          unoptimized={true}
          priority
        />
      )}
    </div>
  );
};
