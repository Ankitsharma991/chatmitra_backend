import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// create a new user and save it to the database and save in cookie
export const newUser = async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) return next(new ErrorHandler("username already exists", 404));

  const avatar = {
    public_id: "sdfds",
    url: "asdfs",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  //   res.status(201).json({ message: "User created successfully!!" });
  sendToken(res, user, 201, "User created Successfully!!");
};

export const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid username or password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid username or password", 404));
  }
  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});

export const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  return res.status(200).json({
    success: true,
    data: user,
  });
});

export const logout = TryCatch(async (req, res) => {
  res
    .status(200)
    .cookie("mitra-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully!!",
    });
});

export const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;
  return res.status(200).json({
    success: true,
    message: name,
  });
});