import 'dotenv/config';
import { app } from "./app.js";
import { connectDB } from "./db/db.js";



const PORT = process.env.SRV_PORT || 5900;

const start = async () => {
  try {

    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on PORT = ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
