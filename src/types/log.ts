import { z } from "zod";

const MAX_FILE_SIZE = 200 * 1024; // 200KB

export const logSchema = z.object({
  date: z.string(), 
  type: z.enum(["HADIR", "SAKIT", "IZIN", "LIBUR"]),
  activity: z.string().min(5, "Kegiatan minimal 5 karakter"),
  description: z.string().optional(),
  file: z.any().optional(),
});

export type LogInput = z.infer<typeof logSchema>;

export const validateFile = (file: File | null, type: string) => {
  if (type !== "HADIR") return { success: true };

  if (!file) {
    return { success: false, error: "Foto wajib diupload untuk kegiatan HADIR" };
  }
  
  if (file.type !== "image/webp") {
    return { success: false, error: "Backend hanya menerima format WebP!" };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "Ukuran file melebihi 200KB!" };
  }

  return { success: true };
};