import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChat,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
} from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);
app.post("/new", newGroupChat);
app.get("/my", getMyChat);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.put("/removemember", removeMember);
app.delete("/leave/:id", leaveGroup);

// send attachments
// get messages
// get chat details
//

export default app;
