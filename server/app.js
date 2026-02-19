import express from "express"
import routes from './routes/index.js'
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path";
import hallGalleryRoutes from './routes/halls.gallery.routes.js'


export const app = express();

app.use(cors({
  origin: "http://localhost:5176", 
  credentials: true,
  allowedHeaders: ['Content-Type','x-csrf'],
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
}));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api", routes);

app.use("/api", hallGalleryRoutes)