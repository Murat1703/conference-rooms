import {Pool} from "pg"
import 'dotenv/config'            

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.PORT_DB,
    database: process.env.DATABASE
})

export const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};
