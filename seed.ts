import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ini loag env
dotenv.config({ path: ".env.local" });

const seedUser = async () => {
  console.log("🚀 Memulai proses seeding...");

  //  Cek env
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ ERROR: MONGODB_URI tidak ditemukan di .env.local");
    console.error("Pastikan file .env.local ada dan berisi MONGODB_URI=...");
    process.exit(1);
  }

  try {
  
    const User = (await import("./src/models/User")).default;

    console.log("🔌 Menghubungkan ke MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Terhubung ke Database!");
    await User.deleteMany({ email: "mentor@internlog.com" });

    console.log("👤 Membuat user Mentor...");
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Mentor Utama",
      email: "mentor@internlog.com",
      password: hashedPassword,
      role: "MENTOR",
    });

    console.log("🎉 Seed Berhasil!");
    console.log("-----------------------------------");
    console.log("📧 Email: mentor@internlog.com");
    console.log("🔑 Pass : admin123");
    console.log("-----------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Seed Gagal:", error);
    process.exit(1);
  }
};

seedUser();