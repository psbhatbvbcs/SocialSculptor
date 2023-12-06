import express from "express";
import {
  facebookLogin,
  getFacebookPostById,
  getFacebookPosts,
} from "../controllers/facebookController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//sign up

router.post("/facebookLogin", authMiddleware, facebookLogin);
router.get(
  "/getFacebookPosts/:userId/:accessToken",
  authMiddleware,
  getFacebookPosts
);
router.get(
  "/getPost/:postId/:accessToken",
  authMiddleware,
  getFacebookPostById
);

export default router;
