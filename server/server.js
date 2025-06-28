import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 8080;

  await connectDB(); 

  const app = express();

  app.use(cors());
  app.use(express.json()); 

  app.use("/api/user", userRouter);
  app.use("/api/image", imageRouter);

  app.get("/", (req, res) => {
    res.send("API working");
  });

  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });



