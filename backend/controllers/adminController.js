import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usersModel.js";
import pemesananModel from "../models/pemesananModel.js";
import paketModel from "../models/paketModel.js";
import kriteriaModel from "../models/kriteriaModel.js";
import { v2 as cloudinary } from "cloudinary";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await userModel.findOne({ email });

    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    if (admin.role !== "admin") {
      return res.json({ success: false, message: "Access denied" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const atoken = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
    );

    res.json({ success: true, message: "Login successful", atoken });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to login admin" });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.json({ success: false, message: "Invalid secret key" });
    }

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new userModel({
      email,
      nameUser: name,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    res.json({ success: true, message: "Admin registration successful" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to register admin" });
  }
};

// Paket CRUD

const addPaket = async (req, res) => {
  try {
    const {
      namePaket,
      description,
      price,
      duration,
      jumlahModul,
      tingkatKesulitan,
      masaAkses,
      sertifikat,
      metode,
    } = req.body;
    const imageFile = req.file;

    if (
      !namePaket ||
      !description ||
      !price ||
      !duration ||
      !jumlahModul ||
      !tingkatKesulitan ||
      !masaAkses ||
      !sertifikat ||
      !metode
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const paketData = {
      namePaket,
      description,
      price,
      duration,
      jumlahModul,
      tingkatKesulitan,
      masaAkses,
      imagePaket: imageUrl,
      sertifikat,
      metode,
    };

    const newPaket = new paketModel(paketData);
    await newPaket.save();

    return res.json({ success: true, message: "Paket added successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to add paket" });
  }
};

const deletePaket = async (req, res) => {
  try {
    const { paketId } = req.params;
    if (!paketId) {
      return res.json({ success: false, message: "Paket ID is required" });
    }

    const deletedPaket = await paketModel.findOneAndDelete({ paketId });
    if (!deletedPaket) {
      return res.json({ success: false, message: "Paket not found" });
    }

    return res.json({ success: true, message: "Paket deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to delete paket" });
  }
};

const updatePaket = async (req, res) => {
  try {
    const { paketId } = req.params;
    const {
      namePaket,
      description,
      price,
      duration,
      jumlahModul,
      tingkatKesulitan,
      masaAkses,
      sertifikat,
      metode,
    } = req.body;

    if (
      !namePaket ||
      !description ||
      !price ||
      !duration ||
      !jumlahModul ||
      !tingkatKesulitan ||
      !masaAkses ||
      !sertifikat ||
      !metode ||
      !duration
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    let updateData = {
      namePaket,
      description,
      price,
      duration,
      jumlahModul,
      tingkatKesulitan,
      masaAkses,
      sertifikat,
      metode,
    };

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    const updatedPaket = await paketModel.findOneAndUpdate(
      { paketId },
      updateData,
      { new: true },
    );
    if (!updatedPaket) {
      return res.json({ success: false, message: "Paket not found" });
    }

    return res.json({
      success: true,
      message: "Paket updated successfully",
      paket: updatedPaket,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to update paket" });
  }
};

// Kriteria CRUD
const addKriteria = async (req, res) => {
  try {
    const { nameKriteria, bobot, tipe } = req.body;

    if (!nameKriteria || !bobot || !tipe) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const kriteriaData = {
      nameKriteria,
      bobot,
      tipe,
    };

    const newKriteria = new kriteriaModel(kriteriaData);
    await newKriteria.save();

    return res.json({ success: true, message: "Kriteria added successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to add kriteria" });
  }
};

const deleteKriteria = async (req, res) => {
  try {
    const { kriteriaId } = req.params;
    if (!kriteriaId) {
      return res.json({ success: false, message: "Kriteria ID is required" });
    }

    const deletedKriteria = await kriteriaModel.findOneAndDelete({
      kriteriaId,
    });
    if (!deletedKriteria) {
      return res.json({ success: false, message: "Kriteria not found" });
    }

    res.json({ success: true, message: "Kriteria deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to delete kriteria" });
  }
};

const updateKriteria = async (req, res) => {
  try {
    const { kriteriaId } = req.params;
    const { nameKriteria, bobot, tipe } = req.body;

    if (!nameKriteria || !bobot || !tipe) {
      return res.json({ success: false, message: "All fields are required" });
    }

    let updateData = {
      nameKriteria,
      bobot,
      tipe,
    };

    const updatedKriteria = await kriteriaModel.findOneAndUpdate(
      { kriteriaId },
      updateData,
      { new: true },
    );

    if (!updatedKriteria) {
      return res.json({ success: false, message: "Kriteria not found" });
    }

    res.json({
      success: true,
      message: "Kriteria updated successfully",
      kriteria: updatedKriteria,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to update kriteria" });
  }
};

const getPemesanan = async (req, res) => {
  try {
    const pemesananList = await pemesananModel.find({}).select("-password");
    return res.json({ success: true, pemesanan: pemesananList });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Failed to get pemesanan" });
  }
};

const getDashStats = async (req, res) => {
  try {
    const totalUser = await userModel.countDocuments({
      role: "user",
    });
    const totalPaket = await paketModel.countDocuments();
    const totalPemesanan = await pemesananModel.countDocuments();
    const totalKriteria = await kriteriaModel.countDocuments();
    const latestOrders = await pemesananModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalUser,
        totalPaket,
        totalPemesanan,
        totalKriteria,
        latestOrders,
      },
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {orderId} = req.params;
    const {status} = req.body;

    if (!["completed", "rejected"].includes(status)) {
      return res.json({
        success: false,
        message:"Status tidak valid",
      })
    }

    const order = await pemesananModel.findOne({
      pemesananId : orderId,
    });

    if (!order) {
      return res.json({
        success: false,
        message:"Pesanan tidak ditemukan",
      })
    }

    await pemesananModel.findOneAndUpdate(
      {
        pemesananId: orderId,
      },
      {
        paymentStatus: status,
      }
    );

    return res.json({
      success: true,
      message:
        status === "completed"
        ? "Pembayaran berhasil dikonfirmasi"
        : 'Pembayaran ditolak'
    });

  } catch (error) {
    console.log(error);
    
    return res.json({
      success: false,
      message: "Terjadi kesalahan"
    })
  }
}

export {
  loginAdmin,
  registerAdmin,
  addPaket,
  deletePaket,
  updatePaket,
  addKriteria,
  deleteKriteria,
  updateKriteria,
  getPemesanan,
  getDashStats,
  verifyPayment
};
