import mongoose from "mongoose";
import { nanoid } from "nanoid";

const paketSchema = new mongoose.Schema({
  paketId: {
    type: String,
    default: () => nanoid(8), // contoh: "aB3dEfGh"
    unique: true,
    required: true,
  },
  namePaket: { type: String, required: true, maxlength: 50 },
  imagePaket: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  jumlahModul: { type: Number, required: true },
  tingkatKesulitan: { type: String, required: true, maxlength: 20 },
  masaAkses: { type: Number, required: true },
  sertifikat: { type: String, required: true, enum: ["ada", "tidak"]},
  metode: { type: String, required: true, enum: ["vidio", "live class", "hybrid"]},
});

const paketModel =
  mongoose.models.paket || mongoose.model("paket", paketSchema);
export default paketModel;
