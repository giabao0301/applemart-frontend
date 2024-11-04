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
