import fs from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

export async function saveImageWebp(buffer, outDir, width = 1600) {
  await fs.promises.mkdir(outDir, { recursive: true });

  const name = crypto.randomBytes(16).toString("hex") + ".webp";
  const fullPath = path.join(outDir, name);

  await sharp(buffer)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(fullPath);

  return name;
}
