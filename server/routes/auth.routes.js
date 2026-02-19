import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";


const router = Router();


router.post("/register", authController.register);
router.get("/me", requireAuth, authController.me);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/users", authController.getAllUsers);

// router.post("/login", login);
// router.post("/logout", logout);

export default router;
