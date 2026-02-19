import hallRoutes from './halls.routes.js'
import authRoutes from './auth.routes.js'
import mailRoutes from './mail.routes.js'
import bookingRoutes from './booking.routes.js'
import { Router } from 'express';

const router = Router();

router.use("/halls", hallRoutes);
router.use("/auth", authRoutes);
router.use("/contact", mailRoutes)
router.use("/booking", bookingRoutes)

export default router;
