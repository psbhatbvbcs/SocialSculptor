import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/errorHandler.js";
import { config } from "dotenv";
import { sendCookie } from "../features/features.js";

config({
  path: "./data/config.env",
});
export const signup = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name == "" || email == "" || password == "") {
      return next(new ErrorHandler("Empty Input Fields", 404));
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      return next(new ErrorHandler("Invalid Name Entered", 404));
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return next(new ErrorHandler("Invalid email entered", 404));
    } else if (password.length < 8) {
      return next(new ErrorHandler("Password too short", 404));
    } else {
      let user = await User.findOne({ email });

      if (user) {
        return next(
          new ErrorHandler("User with the provided email already exists", 404)
        );
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        verified: false,
      });

      res.status(201).json({
        success: true,
        message: "Registered Successfully! Please Log in",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
      return next(new ErrorHandler("Empty Credentials Supplied!", 404));
    }

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password Entered", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password Entered", 404));
    }

    const userData = Object.assign({}, user.toObject());
    delete userData.password;

    sendCookie(userData, res, `Welcome back, ${userData.name}`, 201);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const getUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
      message: "User found successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};
