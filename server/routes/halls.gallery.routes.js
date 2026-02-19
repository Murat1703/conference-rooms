import { Router } from "express";
import { uploadGallery } from "../middleware/uploadGallery.js";
import {
    addHallGallery,
    getHallGallery,
    deleteGalleryItem,
    editGalleryItem
} from '../controllers/halls.gallery.controller.js'

const router = Router();

// загрузка галереи
router.post("/halls/:id/gallery", uploadGallery.array("gallery", 30), addHallGallery);

// получение галереи
router.get("/halls/:id/gallery", getHallGallery);

router.patch("/halls/gallery/:id", editGalleryItem);

// удалить конкретную картинку
router.delete("/halls/gallery/:id", deleteGalleryItem);

export default router;
