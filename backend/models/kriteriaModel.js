import mongoose from "mongoose"
import { nanoid } from "nanoid"

const kriteriaSchema = new mongoose.Schema({
    kriteriaId: {
    type: String,
    default: () => nanoid(8), // contoh: "aB3dEfGh"
    unique: true,
    required: true
  },
    nameKriteria: {type:String, required:true, maxlength: 20},
    bobot: {type:Number, required:true},
    tipe: {type:String, required:true, maxlength: 20},
})

const kriteriaModel = mongoose.models.kriteria || mongoose.model('kriteria', kriteriaSchema)
export default kriteriaModel

