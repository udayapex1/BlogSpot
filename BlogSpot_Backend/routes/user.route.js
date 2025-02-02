import express from "express";
import {
  deleteAccount,
  getAdmins,
  getMyProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);
router.get("/delteAccount/:id", isAuthenticated, deleteAccount);
router.get("/updateProfile/:id", isAuthenticated, updateProfile);



export default router;
