import express from "express";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createUser } from "./seeders/user.js";
import {
  createGroupChats,
  createMessagesInAChat,
  createSingleChats,
} from "./seeders/chat.js";

const app = express();
dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "chat_mitra";

connectDB(mongoURI);
// createUser(10);
// createSingleChats(10)
// createGroupChats(10)
// createMessagesInAChat("66cb2921ca0ca2857288f789", 10);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Welcome to ChatMitra!!");
});

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} Mode`
  );
});
