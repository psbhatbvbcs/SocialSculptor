import express from "express";
import bcrypt from "bcrypt";
import {
  signin,
  signup,
  logout,
  getUser,
  getUserById,
} from "../controllers/user.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//sign up

router.post("/signup", signup);
router.post("/signin", signin);

//log in
// router.post("/login", (req, res) => {

// })

router.get("/getuser/me", authMiddleware, getUser);
router.get("/getUser/:userId", authMiddleware, getUserById);

router.get("/logout", logout);

export default router;
