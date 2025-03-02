import mongoose from "mongoose";
import { Router } from "express";
import path from "path";

const Email = mongoose.model(
  "email",
  new mongoose.Schema({
    email: {
      type: String,
    },
  })
);

const router = Router();
const __dirname = path.resolve(path.dirname(""));

router.route("/").get((_, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.route("/add-email").post(async (req, res) => {
  const { email } = req.body;
  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error adding email");
  }
});

router.route("/emails").get(async (_, res) => {
  try {
    const emails = await Email.find({});
    res.json(emails);
  } catch (error) {
    res.status(500).send("Error fetching emails");
  }
});

router.route("/exit").get((_, res) => {
  // Perform actions to stop the server or any other desired actions
  res.send("Server stopped");
  process.exit(0); // This stops the server (not recommended in production)
});

export default router;
