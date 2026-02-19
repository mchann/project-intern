import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Log from "@/models/Log";


export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    await dbConnect();
    await Log.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Laporan dihapus" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 });
  }
}


export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const body = await req.json();
    const { activity, description } = body;

    await dbConnect();
  
    await Log.findByIdAndUpdate(params.id, { activity, description });
    return NextResponse.json({ message: "Laporan berhasil diedit" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal edit laporan" }, { status: 500 });
  }
}