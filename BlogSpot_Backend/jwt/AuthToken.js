import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    path: "/",
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
