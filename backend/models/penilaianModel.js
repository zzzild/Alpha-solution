import mongoose from "mongoose"
import { nanoid } from "nanoid"

const penilaianSchema = new mongoose.Schema({
  penilaianId: {
    type: String,
    default: () => nanoid(8),
    unique: true,
    required: true,
  },

  paketId: {
    type: String,
    required: true,
  },

  kriteriaId: {
    type: String,
    required: true,
  },

  nilai: {
    type: Number,
    required: true,
  },
})

const penilaianModel =
  mongoose.models.penilaian ||
  mongoose.model("penilaian", penilaianSchema)

export default penilaianModel