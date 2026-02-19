import multer from "multer";

const storage = multer.memoryStorage();

export const uploadGallery = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp"];
    if (!ok.includes(file.mimetype)) return cb(new Error("Только изображения"));
    cb(null, true);
  },
});
