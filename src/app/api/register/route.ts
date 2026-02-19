import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validasi input
const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function POST(req: Request) {
  try {
    //Cek yg req bnr Mentor  
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "MENTOR") {
      return NextResponse.json({ error: "Hanya Mentor yang boleh menambah user!" }, { status: 403 });
    }

    const body = await req.json();

    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten() }, { status: 400 });
    }

    const { name, email, password } = body;

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email sudah terdaftar!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // bikin user bru default intern
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "INTERN", //dftr langsung jd nak intern
    });

    return NextResponse.json({ message: "Berhasil mendaftarkan nak Intern baru!", user: newUser }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mendaftarkan nak intern" }, { status: 500 });
  }
}