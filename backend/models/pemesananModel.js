import mongoose from "mongoose"
import { nanoid } from "nanoid"

const pemesananSchema = new mongoose.Schema({
  pemesananId: {
    type: String,
    default: () => nanoid(8),
    unique: true,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  paketId: {
    type: String,
    required: true,
  },
  
  userData: {type: Object, required: true},
  paketData: {type: Object, required: true},
  paymentStatus: {
      type: String,
      enum: [
        "pending",
        "completed",
        "expired",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

const pemesananModel =
  mongoose.models.pemesanan ||
  mongoose.model("pemesanan", pemesananSchema)

export default pemesananModel