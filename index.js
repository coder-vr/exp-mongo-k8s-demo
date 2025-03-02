import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/k8stest`
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
