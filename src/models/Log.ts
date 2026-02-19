import mongoose, { Schema, model, models } from "mongoose";

const LogSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  type: {
    type: String,
    enum: ["HADIR", "SAKIT", "IZIN", "LIBUR"], // Tipe kehadiran
    default: "HADIR",
    required: true
  },
  activity: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    default: "-" 
  },
  imageUrl: { 
    type: String, 
    required: false // Bisa null jika Sakit/Izin
  },
  date: {
    type: Date,
    default: Date.now, 
    required: true
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED","REJECTED"], 
    default: "PENDING"
  }
}, { timestamps: true });


const Log = models.Log || model("Log", LogSchema);
export default Log;