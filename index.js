import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

// mongodb://localhost:27017
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || "27017";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb://${MONGO_HOST}:${MONGO_PORT}/k8stest`
    );
    console.log(
      `\nMongoDB connected !! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection FAILED ", error);
    process.exit(1);
  }
};

connectDB()
  .then(() =>
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening at port: ${process.env.PORT}`);
    })
  )
  .catch((err) => console.log("MongoDB connection failed !!", err));
