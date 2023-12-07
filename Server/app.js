import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import governmentRoutes from "./routes/GovernmentRoutes.js"; // Assuming the route file is in the same directory

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", governmentRoutes);

app.get("/", (req, res) => {
  res.send("Medisync is up and running!!");
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    app.listen(8001, () => {
      console.log("Server listening on port 8001");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
