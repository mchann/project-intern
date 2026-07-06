import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Load env
dotenv.config({ path: ".env.local" });

const seedUser = async () => {
  console.log("🚀 Memulai proses seeding...");

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ ERROR: MONGODB_URI tidak ditemukan di .env.local");
    process.exit(1);
  }

  try {
    const User = (await import("./src/models/User")).default;

    console.log("🔌 Menghubungkan ke MongoDB...");
    await mongoose.connect(uri, {
      dbName: "log_magang" 
    });
    console.log("✅ Terhubung ke Database!");

    await User.deleteMany({ email: "iqbalmentor@mudapedia.com" });

    console.log("👤 Membuat user Mentor...");
    
    const plainPassword = "admin#mudapedia22";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.create({
      name: "Iqbal Mentor",
      email: "iqbalmentor@mudapedia.com",
      password: hashedPassword,
      role: "MENTOR",
    });

    console.log("🎉 Seed Berhasil!");
    console.log("-----------------------------------");
    console.log("📧 Email: iqbalmentor@mudapedia.com");
    console.log("🔑 Pass : admin#mudapedia22");
    console.log("-----------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Seed Gagal:", error);
    process.exit(1);
  }
};

seedUser();