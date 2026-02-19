import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Log from "@/models/Log";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { logId, status } = body;

    await dbConnect();
    //cari id log 
    await Log.findByIdAndUpdate(logId, { status });

    return NextResponse.json({ message: "Status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}