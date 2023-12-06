import express from "express";
import {} from "../controllers/user.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addRedditUrl } from "../controllers/redditController.js";
import {
  addYoutubeChannel,
  addYoutubeVideo,
  getTracking,
} from "../controllers/youtubeController.js";

const router = express.Router();

//sign up

router.post("/channel", authMiddleware, addYoutubeChannel);
router.post("/video", authMiddleware, addYoutubeVideo);
router.get("/tracking", authMiddleware, getTracking);

export default router;
