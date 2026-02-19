import { Router } from "express";
import * as hallsController from "../controllers/halls.controller.js";
import multer from 'multer'

const router = Router();
const upload = multer()

// GET /api/halls
router.get("/", hallsController.getHalls);
// GET /api/halls/:id
router.get("/:id", hallsController.getHallById);
// post /api/halls
router.post("/", upload.none(), hallsController.createHallItem);
// delete /api/halls
router.delete("/:id", hallsController.deleteHall);

router.put("/:id",upload.none(), hallsController.editHall);



export default router;
