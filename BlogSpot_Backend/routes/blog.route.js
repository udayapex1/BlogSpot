import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getSingleBlogs,
  updateBlog,
} from "../controller/blog.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/create", isAuthenticated, createBlog);
router.delete("/delete/:id", isAuthenticated, deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/single-blog/:id", getSingleBlogs);
router.get("/my-blog", isAuthenticated, getMyBlogs);
router.put("/update/:id", isAuthenticated, updateBlog);

export default router;
