import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["mitra-token"];
  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodeData._id;
  next();
};

export const adminOnly = (req, res, next) => {
  const token = req.cookies["chatMitra-admin-token"];

  if (!token)
    return next(new ErrorHandler("Only admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route!!", 401));

  next();
};
