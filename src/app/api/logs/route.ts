import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Log from "@/models/Log";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user as any;

    const formData = await req.formData();
    const type = formData.get("type") as string;
    const activity = formData.get("activity") as string;
    const description = formData.get("description") as string;
    const dateInput = formData.get("date") as string;
    const file = formData.get("file") as File | null;

  
    if (!type || !activity) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // up ke cloudinary 
    let imageUrl = "";
    
    if (file && file.size > 0) {
      console.log("🚀 Uploading ke Cloudinary...");
      try {
        const uploadResult: any = await uploadToCloudinary(file, "magang-logs");
        imageUrl = uploadResult.secure_url;
        console.log("✅ Upload Berhasil:", imageUrl);
      } catch (uploadError) {
        console.error("Gagal upload:", uploadError);
        return NextResponse.json({ error: "Gagal upload gambar" }, { status: 500 });
      }
    }

    //simpan db
    await dbConnect();
    
    const newLog = await Log.create({
      user: user.id,
      name: user.name, // Simpan nama biar gampang display
      date: new Date(dateInput),
      type,
      activity,
      description,
      imageUrl,
    });

    return NextResponse.json({ message: "Log berhasil disimpan!", data: newLog }, { status: 201 });

  } catch (error: any) {
    console.error("Error API Log:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}