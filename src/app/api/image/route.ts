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

export const DELETE = async (req: NextRequest) => {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "Missing publicId parameter" },
        { status: 400 }
      );
    }

    const deleteResponse = await cloudinary.uploader.destroy(publicId);

    if (deleteResponse.result !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
};
