import validator from "validator";
import userModel from "../models/usersModel.js";
import paketModel from "../models/paketModel.js";
import kriteriaModel from "../models/kriteriaModel.js";
import pemesananModel from "../models/pemesananModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, address, phone, gender } = req.body;

    if (!name || !email || !password || !address || !phone || !gender) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!/^[a-zA-Z\s]{3,50}$/.test(name)) {
      return res.json({ success: false, message: "Enter a valid full name" });
    }

    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res.json({ success: false, message: "Email already registered" });
    }

    // PHONE NUMBER VALIDATION (Indonesia standard)
    if (!/^(08)[0-9]{8,12}$/.test(phone)) {
      return res.json({
        success: false,
        message: "Enter a valid phone number",
      });
    }

    // validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      nameUser: name,
      email,
      password: hashedPassword,
      address,
      phone,
      gender,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, message: "Registration successful", token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // cek field kosong
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    // cari user berdasarkan email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    // bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        userId: user.userId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        nameUser: user.nameUser,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.json({
      success: false,
      message: "Login failed",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findOne({ userId }).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to retrieve user profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!/^[a-zA-Z\s]{3,50}$/.test(name)) {
      return res.json({ success: false, message: "Enter a valid full name" });
    }

    await userModel.findOneAndUpdate({ userId }, { name, address, phone });

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to update profile" });
  }
};

export const allPaket = async (req, res) => {
  try {
    const paket = await paketModel.find({}).select("-password");
    res.json({ success: true, paket });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Failed to retrieve paket data",
    });
  }
};

export const getPaket = async (req, res) => {
  try {
    const { paketId } = req.params;
    const paket = await paketModel.findOne({ paketId });

    if (!paket) {
      return res.json({ success: false, message: "Paket not found" });
    }

    res.json({ success: true, paket });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Failed to retrieve paket data",
    });
  }
};

export const allKriteria = async (req, res) => {
  try {
    const kriteria = await kriteriaModel.find({}).select("-password");
    res.json({ success: true, kriteria });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to retrieve kriteria data" });
  }
};

export const orderPaket = async (req, res) => {
  try {
    const { paketId } = req.body;
    const userId = req.userId;

    const paketData = await paketModel.findOne({ paketId }).select("-password");

    if (!paketData) {
      return res.json({ success: false, message: "Paket not found" });
    }

    const userData = await userModel.findOne({ userId }).select("-password");

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const orderData = {
      userId,
      paketId,
      userData,
      paketData: {
        namePaket: paketData.namePaket,
      },
    };
    const newOrder = new pemesananModel(orderData);
    await newOrder.save();
    return res.json({
      success: true,
      message: "Order paket berhasil dibuat!",
      data: orderData 
    });

  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Failed to order paket",
    });
  }
};

export const orderHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await pemesananModel.find({ userId }).select("-password");
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Failed to retrieve order history",
    });
  }
}

export const uploadPaymentProof = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!req.file) {
      return res.json({ success: false, message: "Bukti pembayaran tidak ditemukan" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "payment_proofs",
    });

    await pemesananModel.findOneAndUpdate(
      { pemesananId: orderId },
      { paymentProof: upload.secure_url, paymentStatus: "paid" },
    );
    res.json({ success: true, message: "Bukti pembayaran berhasil diunggah" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to upload payment proof" });
  }
};