import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }
    const { email, userName, password, phone, profession, role } = req.body;
    if (
      !email ||
      !userName ||
      !password ||
      !phone ||
      !profession ||
      !role ||
      !photo
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
      phone,
      profession,
      role,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
    await newUser.save();
    if (newUser) {
      let token = await createTokenAndSaveCookies(newUser._id, res);
      console.log("Singup: ", token);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          role: newUser.role,
          profession: newUser.profession,
          avatar: newUser.avatar,
          createdOn: newUser.createdOn,
        },
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    let token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        userName: user.userName,
        name: user.name,
        email: user.email,
        role: user.role,
        profession: user.profession,
        photo: user.photo,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "Admin" });
  res.status(200).json({ admins });
};


export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findByIdAndDelete(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "Unabe To delete" });

    }
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Prevent updating restricted fields
    const allowedFields = ["userName", "name", "profession", "password"];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    // Update user with only allowed fields
    const userToUpdate = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensures validation runs on update
    });

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: userToUpdate,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Unable to update profile. Please try again later." });
  }
}