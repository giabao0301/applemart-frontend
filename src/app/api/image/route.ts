import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const POST = async (req: NextRequest) => {
  try {
    const { image } = await req.json();
    const uploadResponse = await cloudinary.uploader.upload(image);
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
};
