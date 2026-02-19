import path from 'path';
import fs from 'fs/promises';
import * as hallsGalleryServices from '../services/halls.gallery.services.js'
import { saveImageWebp } from '../services/gallery.service.js';

export const addHallGallery = async (req, res, next) => {
  try {
    const hallID = req.params.id;
    const files = req.files || [];

    if (!files.length) {
      return res.status(400).json({ message: "Файлы не переданы" });
    }

    const outDir = path.resolve("uploads/halls/gallery");
    const urls = [];

    for (const f of files) {
      const filename = await saveImageWebp(f.buffer, outDir, 2000);
      urls.push(`/uploads/halls/gallery/${filename}`);
    }

    // сonsole.log('req AddGellery = ',req.body)

    const rows = await hallsGalleryServices.addGallery(hallID, urls);

    res.status(201).json({
      hall_id: Number(hallID),
      items: rows,
    });
  } catch (err) {
    next(err);
  }
};

export const getHallGallery = async (req, res, next) => {
  try {
    const hallID = req.params.id;
    const items = await hallsGalleryServices.getGalleryByHallId(hallID);
    res.json({ hall_id: Number(hallID), items });
  } catch (err) {
    next(err);
  }
};

export const editGalleryItem = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { url } = req.body;

    const updated = await hallsGalleryServices.editGalleryItem(id, { url });

    if (!updated) {      return res.status(404).json({ message: "Элемент галереи не найден" });

    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};


export const deleteGalleryItem = async (req, res, next) => {
  try {
    const galleryId = req.params.id;
    console.log('galleryItemID = ',galleryId)

    // 1) удаляем запись
    const deleted = await hallsGalleryServices.deleteGalleryItem(galleryId);
    if (!deleted) return res.status(404).json({ message: "Не найдено" });

    // 2) опционально: удалить файл на диске (если url локальный)
    // url: "/uploads/news/gallery/xxx.webp"
    try {
      const rel = deleted.url.startsWith("/") ? deleted.url.slice(1) : deleted.url;
      await fs.unlink(path.resolve(rel));
    } catch (_) {
      // если файла нет — не валим запрос
    }

    res.json({ success: true, deleted });
  } catch (err) {
    next(err);
  }
};
