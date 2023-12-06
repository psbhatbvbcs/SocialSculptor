import express from "express";
import {} from "../controllers/user.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addRedditUrl,
  addSubreddit,
  getRedditTypeById,
  getTracking,
} from "../controllers/redditController.js";

const router = express.Router();

//sign up

router.post("/url", authMiddleware, addRedditUrl);
router.post("/subreddit", authMiddleware,addSubreddit);
router.get("/tracking", authMiddleware, getTracking);
router.get("/getRedditType/:redditId",authMiddleware, getRedditTypeById);

export default router;
