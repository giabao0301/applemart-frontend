export const uploadImage = async (file: File): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const response = await fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await response.json();
        resolve(data.url);
      } catch (error) {
        reject("Failed to upload image");
      }
    };
    reader.onerror = () => reject("Failed to read file");
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    const response = await fetch("/api/image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete image");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An error occurred"
    );
  }
};

export const extractPublicId = (url: string): string => {
  try {
    const regex = /\/upload\/(?:v\d+\/)?(.+?)(\.\w+)?$/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    return "";
  } catch (error) {
    console.error("Failed to extract public ID:", error);
    return "";
  }
};
