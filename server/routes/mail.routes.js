import { Router } from "express";
import nodemailer from "nodemailer";
// import { z } from "zod";
import rateLimit from "express-rate-limit";

const router = Router();

const limiter = rateLimit({ windowMs: 60_000, max: 20 }); // 5 запросов/мин с IP
router.use(limiter);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ),
  secure: false, // true для 465
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

router.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;
    await transporter.sendMail({
      from: `"TEST PROJECT" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: `Тестирование заявки с сайта`,
      text: `Имя: ${name} <${name}>`,
      html: `<p><b>Имя:</b> ${name}</p>
             <p><b>Номер:</b><a href="tel:${phone}" target="_blank">${phone}</a></p> `,
    });
    console.log(res.json)
    return res.json({ ok: true });
  } catch (e) {
    console.error("[mail]", e);
    return res.status(400).json({ ok: false, error: e.message ?? "Bad request" });
  }
});

export default router;
